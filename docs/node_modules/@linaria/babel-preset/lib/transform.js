"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transform;
exports.transformSync = transformSync;
var babel = _interopRequireWildcard(require("@babel/core"));
var _cache = require("./cache");
var _prepareForEval = _interopRequireWildcard(require("./transform-stages/1-prepare-for-eval"));
var _eval = _interopRequireDefault(require("./transform-stages/2-eval"));
var _prepareForRuntime = _interopRequireDefault(require("./transform-stages/3-prepare-for-runtime"));
var _extract = _interopRequireDefault(require("./transform-stages/4-extract"));
var _withLinariaMetadata = _interopRequireDefault(require("./utils/withLinariaMetadata"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This file exposes transform function that:
 * - parse the passed code to AST
 * - transforms the AST using Linaria babel preset ('./babel/index.js) and additional config defined in Linaria config file or passed to bundler configuration.
 * - runs generated CSS files through default of user-defined preprocessor
 * - generates source maps for CSS files
 * - return transformed code (without Linaria template literals), generated CSS, source maps and babel metadata from transform step.
 */

function syncStages(originalCode, options, prepareStageResult, babelConfig, cache, eventEmitter) {
  var _collectStageResult$c;
  const {
    filename
  } = options;

  // File does not contain any tags. Return original code.
  if (!prepareStageResult || !(0, _withLinariaMetadata.default)(prepareStageResult.metadata)) {
    return {
      code: originalCode,
      sourceMap: options.inputSourceMap
    };
  }

  // *** 2nd stage ***

  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-2:start',
    filename
  });
  const evalStageResult = (0, _eval.default)(cache, prepareStageResult.code, options);
  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-2:finish',
    filename
  });
  if (evalStageResult === null) {
    return {
      code: originalCode,
      sourceMap: options.inputSourceMap
    };
  }
  const [valueCache, dependencies] = evalStageResult;

  // *** 3rd stage ***

  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-3:start',
    filename
  });
  const collectStageResult = (0, _prepareForRuntime.default)(babel, originalCode, valueCache, options, babelConfig);
  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-3:finish',
    filename
  });
  if (!(0, _withLinariaMetadata.default)(collectStageResult.metadata)) {
    return {
      code: collectStageResult.code,
      sourceMap: collectStageResult.map
    };
  }

  // *** 4th stage

  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-4:start',
    filename
  });
  const extractStageResult = (0, _extract.default)(collectStageResult.metadata.linaria.processors, originalCode, options);
  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-4:finish',
    filename
  });
  return {
    ...extractStageResult,
    code: (_collectStageResult$c = collectStageResult.code) !== null && _collectStageResult$c !== void 0 ? _collectStageResult$c : '',
    dependencies,
    replacements: [...extractStageResult.replacements, ...collectStageResult.metadata.linaria.replacements],
    sourceMap: collectStageResult.map
  };
}
function transformSync(originalCode, options, syncResolve, babelConfig = {}, cache = new _cache.TransformCacheCollection(), eventEmitter) {
  const {
    filename
  } = options;
  // *** 1st stage ***

  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-1:start',
    filename
  });
  const entrypoint = {
    name: options.filename,
    code: originalCode,
    only: ['__linariaPreval']
  };
  const prepareStageResults = (0, _prepareForEval.prepareForEvalSync)(babel, cache, syncResolve, entrypoint, options);
  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-1:finish',
    filename
  });

  // *** The rest of the stages are synchronous ***

  return syncStages(originalCode, options, prepareStageResults, babelConfig, cache, eventEmitter);
}
async function transform(originalCode, options, asyncResolve, babelConfig = {}, cache = new _cache.TransformCacheCollection(), eventEmitter) {
  const {
    filename
  } = options;

  // *** 1st stage ***

  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-1:start',
    filename
  });
  const entrypoint = {
    name: filename,
    code: originalCode,
    only: ['__linariaPreval']
  };
  const prepareStageResults = await (0, _prepareForEval.default)(babel, cache, asyncResolve, entrypoint, options);
  eventEmitter === null || eventEmitter === void 0 ? void 0 : eventEmitter({
    type: 'transform:stage-1:finish',
    filename
  });

  // *** The rest of the stages are synchronous ***

  return syncStages(originalCode, options, prepareStageResults, babelConfig, cache, eventEmitter);
}
//# sourceMappingURL=transform.js.map