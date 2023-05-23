"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareForEval;
exports.prepareCode = prepareCode;
exports.prepareForEvalSync = prepareForEvalSync;
var _fs = require("fs");
var _path = require("path");
var _logger = require("@linaria/logger");
var _utils = require("@linaria/utils");
var _withLinariaMetadata = _interopRequireDefault(require("../utils/withLinariaMetadata"));
var _ModuleQueue = require("./helpers/ModuleQueue");
var _cachedParseSync = _interopRequireDefault(require("./helpers/cachedParseSync"));
var _loadLinariaOptions = _interopRequireDefault(require("./helpers/loadLinariaOptions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-restricted-syntax,no-continue,no-await-in-loop */

const isModuleResolver = i => typeof i === 'object' && i !== null && i.key === 'module-resolver';
function runPreevalStage(babel, filename, code, options, perFileBabelConfig) {
  var _fullParserOptions$pl, _result$ast;
  const pluginOptions = (0, _loadLinariaOptions.default)(options.pluginOptions);
  const parseConfig = (0, _utils.buildOptions)(pluginOptions === null || pluginOptions === void 0 ? void 0 : pluginOptions.babelOptions, perFileBabelConfig);
  const fullParserOptions = (0, _utils.loadBabelOptions)(babel, filename, parseConfig);
  const file = (0, _cachedParseSync.default)(babel, code, fullParserOptions);
  const transformPlugins = [[require.resolve('../plugins/preeval'), pluginOptions]];
  const moduleResolverPlugin = (_fullParserOptions$pl = fullParserOptions.plugins) === null || _fullParserOptions$pl === void 0 ? void 0 : _fullParserOptions$pl.find(isModuleResolver);
  if (moduleResolverPlugin) {
    transformPlugins.unshift(moduleResolverPlugin);
  }
  const transformConfig = (0, _utils.buildOptions)({
    envName: 'linaria',
    plugins: transformPlugins,
    sourceMaps: true,
    sourceFileName: filename,
    inputSourceMap: options.inputSourceMap,
    root: options.root,
    ast: true,
    babelrc: false,
    configFile: false
  });
  const result = babel.transformFromAstSync(file, code, {
    ...transformConfig,
    filename
  });
  if (!result || !((_result$ast = result.ast) !== null && _result$ast !== void 0 && _result$ast.program)) {
    throw new Error('Babel transform failed');
  }
  return result;
}
function getMatchedRule(rules, filename, code) {
  for (let i = rules.length - 1; i >= 0; i--) {
    const rule = rules[i];
    if (!rule.test) {
      return rule;
    }
    if (typeof rule.test === 'function' && rule.test(filename, code)) {
      return rule;
    }
    if (rule.test instanceof RegExp && rule.test.test(filename)) {
      return rule;
    }
  }
  return {
    action: 'ignore'
  };
}
function prepareCode(babel, filename, originalCode, only, options) {
  const log = (0, _logger.createCustomDebug)('transform', (0, _utils.getFileIdx)(filename));
  const pluginOptions = (0, _loadLinariaOptions.default)(options.pluginOptions);
  const {
    action,
    babelOptions
  } = getMatchedRule(pluginOptions.rules, filename, originalCode);
  if (action === 'ignore' || filename.endsWith('.json')) {
    log('stage-1:ignore', '');
    return [originalCode, null];
  }
  const preevalStageResult = runPreevalStage(babel, filename, originalCode, options, babelOptions);
  if (only.length === 1 && only[0] === '__linariaPreval' && !(0, _withLinariaMetadata.default)(preevalStageResult.metadata)) {
    log('stage-1:evaluator:end', 'no metadata');
    return [preevalStageResult.code, null, preevalStageResult.metadata];
  }
  log('stage-1:preeval', 'metadata %O', preevalStageResult.metadata);

  // Action can be a function or a module name
  const evaluator = typeof action === 'function' ? action : require(require.resolve(action, {
    paths: [(0, _path.dirname)(filename)]
  })).default;
  log('stage-1:evaluator:start', 'using %s', evaluator.name);
  const result = evaluator(filename, pluginOptions, preevalStageResult.code, only, babel);
  log('stage-1:evaluator:end', '');
  return [...result, preevalStageResult.metadata];
}
function processQueueItem(babel, item, cache, options) {
  if (!item) {
    return undefined;
  }
  const pluginOptions = (0, _loadLinariaOptions.default)(options.pluginOptions);
  const {
    name,
    only,
    code
  } = item;
  const onlyAsStr = only.join(', ');
  const log = (0, _logger.createCustomDebug)('transform', (0, _utils.getFileIdx)(name));
  const extension = (0, _path.extname)(name);
  if (!pluginOptions.extensions.includes(extension)) {
    log('init', `${name} is ignored. If you want it to be processed, you should add '${extension}' to the "extensions" option.`);
    return undefined;
  }
  log('init', `${name} (${onlyAsStr})\n${code}`);
  log('stage-1', `>> (${onlyAsStr})`);
  const [preparedCode, imports, metadata] = prepareCode(babel, name, code, only, options);
  if (code === preparedCode) {
    log('stage-1', `<< (${onlyAsStr})\n === no changes ===`);
  } else {
    log('stage-1', `<< (${onlyAsStr})\n${preparedCode}`);
  }
  if (preparedCode === '') return undefined;
  return {
    imports,
    name,
    result: {
      metadata,
      code: preparedCode
    }
  };
}
const isEqual = ([...a], [...b]) => {
  if (a.includes('*')) return true;
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((item, index) => item === b[index]);
};
function prepareForEvalSync(babel, cache, resolve, entrypoint, options) {
  var _cache$codeCache$get;
  const queue = new _ModuleQueue.ModuleQueue(entrypoint);
  while (!queue.isEmpty()) {
    var _queue$dequeue;
    const [nextItem, resolveStack] = (_queue$dequeue = queue.dequeue()) !== null && _queue$dequeue !== void 0 ? _queue$dequeue : [];
    if (!nextItem || !resolveStack) {
      continue;
    }
    const {
      name,
      only,
      code
    } = nextItem;
    const log = (0, _logger.createCustomDebug)('transform', (0, _utils.getFileIdx)(name));
    const cached = cache.codeCache.get(name);
    // If we already have a result for this file, we should get a result for merged `only`
    const mergedOnly = cached !== null && cached !== void 0 && cached.only ? Array.from(new Set([...cached.only, ...only])) : only;
    if (cached && isEqual(cached.only, mergedOnly)) {
      log('stage-1', '%s is already processed', name);
      continue;
    }
    const processed = processQueueItem(babel, {
      name,
      code,
      only: mergedOnly
    }, cache, options);
    if (!processed) continue;
    const {
      imports,
      result
    } = processed;
    for (const [importedFile, importsOnly] of imports !== null && imports !== void 0 ? imports : []) {
      try {
        const resolved = resolve(importedFile, name, resolveStack);
        log('stage-1:sync-resolve', `✅ ${importedFile} -> ${resolved} (only: %o)`, importsOnly);
        const resolveCacheKey = `${name} -> ${importedFile}`;
        const resolveCached = cache.resolveCache.get(resolveCacheKey);
        const importsOnlySet = new Set(importsOnly);
        if (resolveCached) {
          const [, cachedOnly] = resolveCached.split('\0');
          cachedOnly === null || cachedOnly === void 0 ? void 0 : cachedOnly.split(',').forEach(token => {
            importsOnlySet.add(token);
          });
        }
        cache.resolveCache.set(resolveCacheKey, `${resolved}\0${[...importsOnlySet].join(',')}`);
        const fileContent = (0, _fs.readFileSync)(resolved, 'utf8');
        queue.enqueue([{
          name: resolved,
          only: importsOnly,
          code: fileContent
        }, [name, ...resolveStack]]);
      } catch (err) {
        log('stage-1:sync-resolve', `❌ cannot resolve ${importedFile}: %O`, err);
      }
    }
    cache.codeCache.set(name, {
      imports,
      only: mergedOnly,
      result
    });
  }
  return (_cache$codeCache$get = cache.codeCache.get(entrypoint.name)) === null || _cache$codeCache$get === void 0 ? void 0 : _cache$codeCache$get.result;
}

/**
 * Parses the specified file and recursively all its dependencies,
 * finds tags, applies eval-time replacements, removes dead code.
 */
async function prepareForEval(babel, cache, resolve, entrypoint, options) {
  var _cache$codeCache$get2;
  /*
   * This method can be run simultaneously for multiple files.
   * A shared cache is accessible for all runs, but each run has its own queue
   * to maintain the correct processing order. The cache stores the outcome
   * of tree-shaking, and if the result is already stored in the cache
   * but the "only" option has changed, the file will be re-processed using
   * the combined "only" option.
   */
  const log = (0, _logger.createCustomDebug)('transform', (0, _utils.getFileIdx)(entrypoint.name));
  const queue = new _ModuleQueue.ModuleQueue(entrypoint);
  while (!queue.isEmpty()) {
    var _queue$dequeue2;
    const [nextItem, resolveStack] = (_queue$dequeue2 = queue.dequeue()) !== null && _queue$dequeue2 !== void 0 ? _queue$dequeue2 : [];
    if (!nextItem || !resolveStack) {
      continue;
    }
    const {
      name,
      only,
      code
    } = nextItem;
    const cached = cache.codeCache.get(name);
    // If we already have a result for this file, we should get a result for merged `only`
    const mergedOnly = cached !== null && cached !== void 0 && cached.only ? Array.from(new Set([...cached.only, ...only])) : only;
    let imports = null;
    let result;
    if (cached) {
      if (isEqual(cached.only, mergedOnly)) {
        log('stage-1', '%s is already processed', name);
        if (!resolveStack.includes(nextItem.name)) {
          imports = cached.imports;
        }
        result = cached.result;
      } else {
        log('stage-1', '%s is already processed, but with different `only` %o (the cached one %o)', name, only, cached === null || cached === void 0 ? void 0 : cached.only);

        // If we already have a result for this file, we should invalidate it
        cache.evalCache.delete(name);
      }
    }
    if (!result) {
      const processed = processQueueItem(babel, {
        name,
        code,
        only: mergedOnly
      }, cache, options);
      if (!processed) {
        log('stage-1', '%s is skipped', name);
        continue;
      }
      imports = processed.imports;
      result = processed.result;
    }
    if (imports) {
      for (const [importedFile, importsOnly] of imports) {
        let resolved = null;
        try {
          resolved = await resolve(importedFile, name, resolveStack);
        } catch (err) {
          log('stage-1:async-resolve', `❌ cannot resolve %s in %s: %O`, importedFile, name, err);
        }
        if (resolved === null) {
          log('stage-1:resolve', `✅ %s in %s is ignored`, importedFile, name);
          continue;
        }
        log('stage-1:async-resolve', `✅ %s (%o) in %s -> %s`, importedFile, importsOnly, name, resolved);
        const resolveCacheKey = `${name} -> ${importedFile}`;
        const resolveCached = cache.resolveCache.get(resolveCacheKey);
        const importsOnlySet = new Set(importsOnly);
        if (resolveCached) {
          const [, cachedOnly] = resolveCached.split('\0');
          cachedOnly === null || cachedOnly === void 0 ? void 0 : cachedOnly.split(',').forEach(token => {
            importsOnlySet.add(token);
          });
        }
        cache.resolveCache.set(resolveCacheKey, `${resolved}\0${[...importsOnlySet].join(',')}`);
        const fileContent = (0, _fs.readFileSync)(resolved, 'utf8');
        queue.enqueue([{
          name: resolved,
          only: importsOnly,
          code: fileContent
        }, [name, ...resolveStack]]);
      }
    } else {
      log('stage-1', '%s has no imports', name);
    }
    cache.codeCache.set(name, {
      imports,
      only: mergedOnly,
      result
    });
  }
  log('stage-1', 'queue is empty, %s is ready', entrypoint.name);
  return (_cache$codeCache$get2 = cache.codeCache.get(entrypoint.name)) === null || _cache$codeCache$get2 === void 0 ? void 0 : _cache$codeCache$get2.result;
}
//# sourceMappingURL=1-prepare-for-eval.js.map