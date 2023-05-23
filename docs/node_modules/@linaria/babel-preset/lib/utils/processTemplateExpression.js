"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getTagProcessor = _interopRequireDefault(require("./getTagProcessor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const processed = new WeakSet();
const processTemplateExpression = (p, fileContext, options, emit) => {
  if (p.parentPath.isExportSpecifier()) return;
  if (processed.has(p.node)) return;
  const tagProcessor = (0, _getTagProcessor.default)(p, fileContext, options);
  processed.add(p.node);
  if (tagProcessor === null) return;
  emit(tagProcessor);
};
var _default = processTemplateExpression;
exports.default = _default;
//# sourceMappingURL=processTemplateExpression.js.map