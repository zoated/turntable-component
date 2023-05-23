"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTagProcessor;
var _fs = require("fs");
var _path = require("path");
var _core = require("@babel/core");
var _helperModuleImports = require("@babel/helper-module-imports");
var _findUp = _interopRequireDefault(require("find-up"));
var _tags = require("@linaria/tags");
var _utils = require("@linaria/utils");
var _collectTemplateDependencies = _interopRequireWildcard(require("./collectTemplateDependencies"));
var _getSource = _interopRequireDefault(require("./getSource"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
      paths: [(0, _path.dirname)(filename)]
    } : {});
    return _findUp.default.sync('package.json', {
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
  var _packageJSON$linaria;
  if (definedTagsCache.has(pkgName)) {
    return definedTagsCache.get(pkgName);
  }
  const packageJSONPath = findPackageJSON(pkgName, filename);
  if (!packageJSONPath) {
    return undefined;
  }
  const packageDir = (0, _path.dirname)(packageJSONPath);
  const packageJSON = JSON.parse((0, _fs.readFileSync)(packageJSONPath, 'utf8'));
  const definedTags = (_packageJSON$linaria = packageJSON.linaria) === null || _packageJSON$linaria === void 0 ? void 0 : _packageJSON$linaria.tags;
  const normalizedTags = definedTags ? Object.entries(definedTags).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value.startsWith('.') ? (0, _path.join)(packageDir, value) : require.resolve(value, {
      paths: [packageDir]
    })
  }), {}) : undefined;
  definedTagsCache.set(pkgName, normalizedTags);
  return normalizedTags;
};
function isValidProcessorClass(module) {
  return module instanceof _tags.BaseProcessor.constructor;
}
function getProcessorFromPackage(packageName, tagName, filename) {
  const definedTags = getDefinedTagsFromPackage(packageName, filename);
  const processorPath = definedTags === null || definedTags === void 0 ? void 0 : definedTags[tagName];
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
  var _options$tagResolver, _relatedImports$map$f;
  const pathBinding = path.scope.getBinding(path.node.name);
  if (!pathBinding) {
    // It's not a binding, so it's not a tag
    return [null, null, null];
  }
  const tagResolver = (_options$tagResolver = options.tagResolver) !== null && _options$tagResolver !== void 0 ? _options$tagResolver : () => null;

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
  }).filter(_utils.isNotNull).filter(i => i[1] === null || i[1].isExpression());
  if (relatedImports.length === 0) {
    return [null, null, null];
  }
  const [Processor = null, tagSource = null, tagPath = null] = (_relatedImports$map$f = relatedImports.map(([{
    imported,
    source
  }, p]) => {
    const customFile = tagResolver(source, imported);
    const processor = customFile ? getProcessorFromFile(customFile) : getProcessorFromPackage(source, imported, filename);
    return [processor, {
      imported,
      source
    }, p];
  }).find(([proc]) => proc)) !== null && _relatedImports$map$f !== void 0 ? _relatedImports$map$f : [];
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
    var _current, _current2, _current3, _current4;
    if ((_current = current) !== null && _current !== void 0 && _current.isSequenceExpression() && last(current.node.expressions) === prev.node) {
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    if ((_current2 = current) !== null && _current2 !== void 0 && _current2.isCallExpression({
      callee: prev.node
    })) {
      const args = current.get('arguments');
      const cookedArgs = args.map(arg => {
        const buildError = arg.buildCodeFrameError.bind(arg);
        if (!arg.isExpression()) {
          throw buildError(`Unexpected type of an argument ${arg.type}`);
        }
        const source = (0, _getSource.default)(arg);
        const extracted = (0, _collectTemplateDependencies.extractExpression)(arg, options.evaluate);
        return {
          ...extracted,
          source,
          buildCodeFrameError: buildError
        };
      }).filter(_utils.isNotNull);
      params.push(['call', ...cookedArgs]);
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    if ((_current3 = current) !== null && _current3 !== void 0 && _current3.isMemberExpression({
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
    if ((_current4 = current) !== null && _current4 !== void 0 && _current4.isTaggedTemplateExpression({
      tag: prev.node
    })) {
      const [quasis, expressionValues] = (0, _collectTemplateDependencies.default)(current, options.evaluate);
      params.push(['template', zip(quasis, expressionValues)]);
      prev = current;
      current = current.parentPath;
      // eslint-disable-next-line no-continue
      continue;
    }
    break;
  }
  const replacer = (replacement, isPure) => {
    (0, _utils.mutate)(prev, p => {
      p.replaceWith(replacement);
      if (isPure) {
        p.addComment('leading', '#__PURE__');
      }
    });
  };
  const astService = {
    ..._core.types,
    addDefaultImport: (importedSource, nameHint) => (0, _helperModuleImports.addDefault)(path, importedSource, {
      nameHint
    }),
    addNamedImport: (name, importedSource, nameHint = name) => (0, _helperModuleImports.addNamed)(path, name, importedSource, {
      nameHint
    })
  };
  return (...args) => {
    var _tagPath$node$loc;
    return new Processor(params, tagSource, astService, (_tagPath$node$loc = tagPath.node.loc) !== null && _tagPath$node$loc !== void 0 ? _tagPath$node$loc : null, replacer, ...args);
  };
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
        displayName = (0, _getSource.default)(keyPath);
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
    var _fileContext$filename;
    const filename = (_fileContext$filename = fileContext.filename) !== null && _fileContext$filename !== void 0 ? _fileContext$filename : 'unknown';
    // Try to derive the path from the filename
    displayName = (0, _path.basename)(filename);
    if (/^index\.[a-z\d]+$/.test(displayName)) {
      // If the file name is 'index', better to get name from parent folder
      displayName = (0, _path.basename)((0, _path.dirname)(filename));
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
  var _counters$get;
  const counter = (_counters$get = counters.get(state)) !== null && _counters$get !== void 0 ? _counters$get : 0;
  counters.set(state, counter + 1);
  return counter;
};
const cache = new WeakMap();
function getTagProcessor(path, fileContext, options) {
  var _cache$get;
  if (!cache.has(path.node)) {
    const root = path.scope.getProgramParent().path;
    const {
      imports
    } = (0, _utils.collectExportsAndImports)(root);
    try {
      const builder = getBuilderForIdentifier(path, imports.filter(_utils.explicitImport), fileContext.filename, options);
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
      if (e === _tags.BaseProcessor.SKIP) {
        cache.set(path.node, null);
        return null;
      }
      if (e instanceof Error) {
        throw buildCodeFrameError(path, e.message);
      }
      throw e;
    }
  }
  return (_cache$get = cache.get(path.node)) !== null && _cache$get !== void 0 ? _cache$get : null;
}
//# sourceMappingURL=getTagProcessor.js.map