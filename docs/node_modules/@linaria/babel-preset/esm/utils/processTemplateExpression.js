import getTagProcessor from './getTagProcessor';
const processed = new WeakSet();
const processTemplateExpression = (p, fileContext, options, emit) => {
  if (p.parentPath.isExportSpecifier()) return;
  if (processed.has(p.node)) return;
  const tagProcessor = getTagProcessor(p, fileContext, options);
  processed.add(p.node);
  if (tagProcessor === null) return;
  emit(tagProcessor);
};
export default processTemplateExpression;
//# sourceMappingURL=processTemplateExpression.js.map