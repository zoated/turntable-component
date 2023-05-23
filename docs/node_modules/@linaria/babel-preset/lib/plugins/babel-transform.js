"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collector;
var _logger = require("@linaria/logger");
var _utils = require("@linaria/utils");
var _cache = require("../cache");
var _prepareForEval = require("../transform-stages/1-prepare-for-eval");
var _eval = _interopRequireDefault(require("../transform-stages/2-eval"));
var _processTemplateExpression = _interopRequireDefault(require("../utils/processTemplateExpression"));
var _withLinariaMetadata = _interopRequireDefault(require("../utils/withLinariaMetadata"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function collector(babel, options) {
  const cache = new _cache.TransformCacheCollection();
  return {
    name: '@linaria/babel/babel-transform',
    pre(file) {
      var _file$opts$root, _file$path$scope$getD;
      (0, _logger.debug)('babel-transform:start', file.opts.filename);
      const entrypoint = {
        name: file.opts.filename,
        code: file.code,
        only: ['__linariaPreval']
      };
      const prepareStageResult = (0, _prepareForEval.prepareForEvalSync)(babel, cache, _utils.syncResolve, entrypoint, {
        root: (_file$opts$root = file.opts.root) !== null && _file$opts$root !== void 0 ? _file$opts$root : undefined,
        pluginOptions: options
      });
      if (!prepareStageResult || !(0, _withLinariaMetadata.default)(prepareStageResult === null || prepareStageResult === void 0 ? void 0 : prepareStageResult.metadata)) {
        return;
      }
      const evalStageResult = (0, _eval.default)(cache, prepareStageResult.code, {
        filename: file.opts.filename,
        pluginOptions: options
      });
      if (evalStageResult === null) {
        return;
      }
      const [valueCache] = evalStageResult;
      file.path.traverse({
        // TODO: process transformed literals
        Identifier: p => {
          (0, _processTemplateExpression.default)(p, file.opts, options, processor => {
            processor.build(valueCache);
            processor.doRuntimeReplacement();
          });
        }
      });

      // We can remove __linariaPreval export and all related code
      const prevalExport = (_file$path$scope$getD = file.path.scope.getData('__linariaPreval')) === null || _file$path$scope$getD === void 0 ? void 0 : _file$path$scope$getD.findParent(p => p.isExpressionStatement());
      if (prevalExport) {
        (0, _utils.removeWithRelated)([prevalExport]);
      }
    },
    visitor: {},
    post(file) {
      (0, _logger.debug)('babel-transform:end', file.opts.filename);
    }
  };
}
//# sourceMappingURL=babel-transform.js.map