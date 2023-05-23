import { readFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { types as t } from '@babel/core';
import { addDefault, addNamed } from '@babel/helper-module-imports';
import findUp from 'find-up';
import { BaseProcessor } from '@linaria/tags';
import { collectExportsAndImports, explicitImport, isNotNull, mutate } from '@linaria/utils';
import collectTemplateDependencies, { extractExpression } from './collectTemplateDependencies';
import getSource from './getSource';
const last = arr => arr[arr.length - 1];
function zip(arr1, arr2) {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i]);
    if (arr2[i]) result.push(arr2[i]);
  }
  return result;
}
function buildCodeFrameError(path, message) {
  try {
    return path.buildCodeFrameError(message);
  } catch {
    return new Error(message);
  }
}
function findPackageJSON(pkgName, filename) {
  try {
    const pkgPath = require.resolve(pkgName, filename ? {
      paths: [dirname(filename)]
    } : {});
    return findUp.sync('package.json', {
      cwd: pkgPath
    });
  } catch (er) {
    if (typeof er === 'object' && er !== null && er.code === 'MODULE_NOT_FOUND') {
      return undefined;
    }
    throw er;
  }
}
const definedTagsCache = new Map();
const getDefinedTagsFromPackage = (pkgName, filename) => {
  if (definedTagsCache.has(pkgName)) {
    return definedTagsCache.get(pkgName);
  }
  const packageJSONPath = findPackageJSON(pkgName, filename);
  if (!packageJSONPath) {
    return undefined;
  }
  const packageDir = dirname(packageJSONPath);
  const packageJSON = JSON.parse(readFileSync(packageJSONPath, 'utf8'));
  const definedTags = packageJSON.linaria?.tags;
  const normalizedTags = definedTags ? Object.entries(definedTags).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value.startsWith('.') ? join(packageDir, value) : require.resolve(value, {
      paths: [packageDir]
    })
  }), {}) : undefined;
  definedTagsCache.set(pkgName, normalizedTags);
  return normalizedTags;
};
function isValidProcessorClass(module) {
  return module instanceof BaseProcessor.constructor;
}
function getProcessorFromPackage(packageName, tagName, filename) {
  const definedTags = getDefinedTagsFromPackage(packageName, filename);
  const processorPath = definedTags?.[tagName];
  if (!processorPath) {
    return null;
  }
  const Processor = require(processorPath).default;
  if (!isValidProcessorClass(Processor)) {
    return null;
  }
  return Processor;
}
function getProcessorFromFile(processorPath) {
  const Processor = require(processorPath).default;
  if (!isValidProcessorClass(Processor)) {
    return null;
  }
  return Processor;
}
function getProcessorForIdentifier(path, imports, filename, options) {
  const pathBinding = path.scope.getBinding(path.node.name);
  if (!pathBinding) {
    // It's not a binding, so it's not a tag
    return [null, null, null];
  }
  const tagResolver = options.tagResolver ?? (() => null);

  // FIXME: can be simplified
  const relatedImports = imports.map(i => {
    const {
      local
    } = i;
    if (local === path) {
      return [i, null];
    }
    if (!local.isIdentifier()) {
      if (path.isDescendant(local)) {
        return [i, local];
      }
      return null;
    }
    const binding = local.scope.getBinding(local.node.name);
    if (pathBinding === binding) {
      return [i, path];
    }
    return null;
  }).filter(isNotNull).filter(i => i[1] === null || i[1].isExpression());
  if (relatedImports.length === 0) {
    return [null, null, null];
  }
  const [Processor = null, tagSource = null, tagPath = null] = relatedImports.map(([{
    imported,
    source
  }, p]) => {
    const customFile = tagResolver(source, imported);
    const processor = customFile ? getProcessorFromFile(customFile) : getProcessorFromPackage(source, imported, filename);
    return [processor, {
      imported,
      source
    }, p];
  }).find(([proc]) => proc) ?? [];
  return Processor === null || tagSource === null || tagPath === null ? [null, null, null] : [Processor, tagSource, tagPath];
}
function getBuilderForIdentifier(path, imports, filename, options) {
  const [Processor, tagSource, tagPath] = getProcessorForIdentifier(path, imports, filename, options);
  if (!Processor || !tagSource || !tagPath) {
    return null;
  }
  const params = [['callee', tagPath.node]];
  let prev = tagPath;
  let current = tagPath.parentPath;
  while (current && current !== path) {
    if (current?.isSequenceExpression() && last(current.node.expressions) === prev.node) {
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    if (current?.isCallExpression({
      callee: prev.node
    })) {
      const args = current.get('arguments');
      const cookedArgs = args.map(arg => {
        const buildError = arg.buildCodeFrameError.bind(arg);
        if (!arg.isExpression()) {
          throw buildError(`Unexpected type of an argument ${arg.type}`);
        }
        const source = getSource(arg);
        const extracted = extractExpression(arg, options.evaluate);
        return {
          ...extracted,
          source,
          buildCodeFrameError: buildError
        };
      }).filter(isNotNull);
      params.push(['call', ...cookedArgs]);
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    if (current?.isMemberExpression({
      object: prev.node
    })) {
      const property = current.get('property');
      if (property.isIdentifier() && !current.node.computed) {
        params.push(['member', property.node.name]);
      } else if (property.isStringLiteral()) {
        params.push(['member', property.node.value]);
      } else {
        throw property.buildCodeFrameError(`Unexpected type of a property`);
      }
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    if (current?.isTaggedTemplateExpression({
      tag: prev.node
    })) {
      const [quasis, expressionValues] = collectTemplateDependencies(current, options.evaluate);
      params.push(['template', zip(quasis, expressionValues)]);
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    break;
  }
  const replacer = (replacement, isPure) => {
    mutate(prev, p => {
      p.replaceWith(replacement);
      if (isPure) {
        p.addComment('leading', '#__PURE__');
      }
    });
  };
  const astService = {
    ...t,
    addDefaultImport: (importedSource, nameHint) => addDefault(path, importedSource, {
      nameHint
    }),
    addNamedImport: (name, importedSource, nameHint = name) => addNamed(path, name, importedSource, {
      nameHint
    })
  };
  return (...args) => new Processor(params, tagSource, astService, tagPath.node.loc ?? null, replacer, ...args);
}
function getDisplayName(path, idx, fileContext) {
  let displayName;
  const parent = path.findParent(p => p.isObjectProperty() || p.isJSXOpeningElement() || p.isVariableDeclarator());
  if (parent) {
    if (parent.isObjectProperty()) {
      if ('name' in parent.node.key) {
        displayName = parent.node.key.name;
      } else if ('value' in parent.node.key) {
        displayName = parent.node.key.value.toString();
      } else {
        const keyPath = parent.get('key');
        displayName = getSource(keyPath);
      }
    } else if (parent.isJSXOpeningElement()) {
      const name = parent.get('name');
      if (name.isJSXIdentifier()) {
        displayName = name.node.name;
      }
    } else if (parent.isVariableDeclarator()) {
      const id = parent.get('id');
      if (id.isIdentifier()) {
        displayName = id.node.name;
      }
    }
  }
  if (!displayName) {
    const filename = fileContext.filename ?? 'unknown';
    // Try to derive the path from the filename
    displayName = basename(filename);
    if (/^index\.[a-z\d]+$/.test(displayName)) {
      // If the file name is 'index', better to get name from parent folder
      displayName = basename(dirname(filename));
    }

    // Remove the file extension
    displayName = displayName.replace(/\.[a-z\d]+$/, '');
    if (displayName) {
      displayName += idx;
    } else {
      throw new Error("Couldn't determine a name for the component. Ensure that it's either:\n" + '- Assigned to a variable\n' + '- Is an object property\n' + '- Is a prop in a JSX element\n');
    }
  }
  return displayName;
}
function isTagReferenced(path) {
  // Check if the variable is referenced anywhere for basic DCE
  // Only works when it's assigned to a variable
  let isReferenced = true;
  const parent = path.findParent(p => p.isObjectProperty() || p.isJSXOpeningElement() || p.isVariableDeclarator());
  if (parent) {
    if (parent.isVariableDeclarator()) {
      const id = parent.get('id');
      // FIXME: replace with id.isReferencedIdentifier()
      if (id.isIdentifier()) {
        const {
          referencePaths
        } = path.scope.getBinding(id.node.name) || {
          referencePaths: []
        };
        isReferenced = referencePaths.length !== 0;
      }
    }
  }
  return isReferenced;
}
const counters = new WeakMap();
const getNextIndex = state => {
  const counter = counters.get(state) ?? 0;
  counters.set(state, counter + 1);
  return counter;
};
const cache = new WeakMap();
export default function getTagProcessor(path, fileContext, options) {
  if (!cache.has(path.node)) {
    const root = path.scope.getProgramParent().path;
    const {
      imports
    } = collectExportsAndImports(root);
    try {
      const builder = getBuilderForIdentifier(path, imports.filter(explicitImport), fileContext.filename, options);
      if (builder) {
        // Increment the index of the style we're processing
        // This is used for slug generation to prevent collision
        // Also used for display name if it couldn't be determined
        const idx = getNextIndex(fileContext);
        const displayName = getDisplayName(path, idx, fileContext);
        const processor = builder(displayName, isTagReferenced(path), idx, options, fileContext);
        cache.set(path.node, processor);
      } else {
        cache.set(path.node, null);
      }
    } catch (e) {
      if (e === BaseProcessor.SKIP) {
        cache.set(path.node, null);
        return null;
      }
      if (e instanceof Error) {
        throw buildCodeFrameError(path, e.message);
      }
      throw e;
    }
  }
  return cache.get(path.node) ?? null;
}
//# sourceMappingURL=getTagProcessor.js.map