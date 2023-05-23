"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareForRuntime;
var _utils = require("@linaria/utils");
var _cachedParseSync = _interopRequireDefault(require("./helpers/cachedParseSync"));
var _loadLinariaOptions = _interopRequireDefault(require("./helpers/loadLinariaOptions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Parses the specified file, finds tags, applies run-time replacements,
 * removes dead code.
 */
function prepareForRuntime(babel, code, valueCache, options, babelConfig) {
  var _babelConfig$filename, _babelConfig$filename2, _result$ast;
  const pluginOptions = (0, _loadLinariaOptions.default)(options.pluginOptions);
  const babelOptions = (0, _utils.loadBabelOptions)(babel, options.filename, pluginOptions === null || pluginOptions === void 0 ? void 0 : pluginOptions.babelOptions);
  const file = (0, _cachedParseSync.default)(babel, code, babelOptions);
  const transformPlugins = [[require.resolve('../plugins/collector'), {
    ...pluginOptions,
    values: valueCache
  }]];
  const transformConfig = (0, _utils.buildOptions)({
    envName: 'linaria',
    plugins: transformPlugins,
    sourceMaps: true,
    sourceFileName: (_babelConfig$filename = babelConfig.filename) !== null && _babelConfig$filename !== void 0 ? _babelConfig$filename : options.filename,
    inputSourceMap: options.inputSourceMap,
    root: options.root,
    ast: true,
    babelrc: false,
    configFile: false,
    sourceType: 'unambiguous'
  });
  const result = babel.transformFromAstSync(file, code, {
    ...transformConfig,
    cwd: babelConfig.cwd,
    filename: (_babelConfig$filename2 = babelConfig.filename) !== null && _babelConfig$filename2 !== void 0 ? _babelConfig$filename2 : options.filename
  });
  if (!result || !((_result$ast = result.ast) !== null && _result$ast !== void 0 && _result$ast.program)) {
    throw new Error('Babel transform failed');
  }
  return result;
}
//# sourceMappingURL=3-prepare-for-runtime.js.map