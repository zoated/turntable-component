"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluate;
var _module = _interopRequireDefault(require("../module"));
var _loadLinariaOptions = _interopRequireDefault(require("../transform-stages/helpers/loadLinariaOptions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * This file is an entry point for module evaluation for getting lazy dependencies.
 */

function evaluate(cache, code, options) {
  var _options$filename;
  const filename = (_options$filename = options === null || options === void 0 ? void 0 : options.filename) !== null && _options$filename !== void 0 ? _options$filename : 'unknown';
  const pluginOptions = (0, _loadLinariaOptions.default)(options.pluginOptions);
  const m = new _module.default(filename !== null && filename !== void 0 ? filename : 'unknown', pluginOptions, cache);
  m.dependencies = [];
  m.evaluate(code);
  return {
    value: m.exports,
    dependencies: m.dependencies,
    processors: m.tagProcessors
  };
}
//# sourceMappingURL=index.js.map