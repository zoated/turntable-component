/**
 * Collector traverses the AST and collects information about imports and
 * all Linaria template literals.
 */

import { debug } from '@linaria/logger';
import { removeWithRelated } from '@linaria/utils';
import processTemplateExpression from '../utils/processTemplateExpression';
export default function collector(babel, options) {
  const values = options.values ?? new Map();
  return {
    name: '@linaria/babel/collector',
    pre(file) {
      debug('collect:start', file.opts.filename);
      this.processors = [];
      file.path.traverse({
        // TODO: process transformed literals
        Identifier: p => {
          processTemplateExpression(p, file.opts, options, processor => {
            processor.build(values);
            processor.doRuntimeReplacement();
            this.processors.push(processor);
          });
        }
      });
    },
    visitor: {},
    post(file) {
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
      const prevalExport = file.path.scope.getData('__linariaPreval')?.findParent(p => p.isExpressionStatement());
      if (prevalExport) {
        removeWithRelated([prevalExport]);
      }
      debug('collect:end', file.opts.filename);
    }
  };
}
//# sourceMappingURL=collector.js.map