"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collector;
var _logger = require("@linaria/logger");
var _utils = require("@linaria/utils");
var _processTemplateExpression = _interopRequireDefault(require("../utils/processTemplateExpression"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Collector traverses the AST and collects information about imports and
 * all Linaria template literals.
 */

function collector(babel, options) {
  var _options$values;
  const values = (_options$values = options.values) !== null && _options$values !== void 0 ? _options$values : new Map();
  return {
    name: '@linaria/babel/collector',
    pre(file) {
      (0, _logger.debug)('collect:start', file.opts.filename);
      this.processors = [];
      file.path.traverse({
        // TODO: process transformed literals
        Identifier: p => {
          (0, _processTemplateExpression.default)(p, file.opts, options, processor => {
            processor.build(values);
            processor.doRuntimeReplacement();
            this.processors.push(processor);
          });
        }
      });
    },
    visitor: {},
    post(file) {
      var _file$path$scope$getD;
      if (this.processors.length === 0) {
        // We didn't find any Linaria template literals.
        return;
      }
      this.file.metadata.linaria = {
        processors: this.processors,
        replacements: [],
        rules: {},
        dependencies: []
      };

      // We can remove __linariaPreval export and all related code
      const prevalExport = (_file$path$scope$getD = file.path.scope.getData('__linariaPreval')) === null || _file$path$scope$getD === void 0 ? void 0 : _file$path$scope$getD.findParent(p => p.isExpressionStatement());
      if (prevalExport) {
        (0, _utils.removeWithRelated)([prevalExport]);
      }
      (0, _logger.debug)('collect:end', file.opts.filename);
    }
  };
}
//# sourceMappingURL=collector.js.map