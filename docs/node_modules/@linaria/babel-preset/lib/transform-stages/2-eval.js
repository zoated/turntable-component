"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evalStage;
var _logger = require("@linaria/logger");
var _utils = require("@linaria/utils");
var _evaluators = _interopRequireDefault(require("../evaluators"));
var _hasLinariaPreval = _interopRequireDefault(require("../utils/hasLinariaPreval"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const wrap = fn => {
  try {
    return fn();
  } catch (e) {
    return e;
  }
};

/**
 * Evaluates template dependencies.
 */
function evalStage(cache, code, options) {
  const log = (0, _logger.createCustomDebug)('transform', (0, _utils.getFileIdx)(options.filename));
  log('stage-2', `>> evaluate __linariaPreval`);
  const evaluated = (0, _evaluators.default)(cache, code, options);
  const linariaPreval = (0, _hasLinariaPreval.default)(evaluated.value) ? evaluated.value.__linariaPreval : undefined;
  if (!linariaPreval) {
    return null;
  }
  const valueCache = new Map();
  Object.entries(linariaPreval).forEach(([key, lazyValue]) => {
    const value = wrap(lazyValue);
    valueCache.set(key, value);
  });
  log('stage-2', `<< evaluated __linariaPreval`, () => JSON.stringify(valueCache));
  return [valueCache, evaluated.dependencies];
}
//# sourceMappingURL=2-eval.js.map