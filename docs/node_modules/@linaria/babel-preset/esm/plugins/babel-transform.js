import { debug } from '@linaria/logger';
import { removeWithRelated, syncResolve } from '@linaria/utils';
import { TransformCacheCollection } from '../cache';
import { prepareForEvalSync } from '../transform-stages/1-prepare-for-eval';
import evalStage from '../transform-stages/2-eval';
import processTemplateExpression from '../utils/processTemplateExpression';
import withLinariaMetadata from '../utils/withLinariaMetadata';
export default function collector(babel, options) {
  const cache = new TransformCacheCollection();
  return {
    name: '@linaria/babel/babel-transform',
    pre(file) {
      debug('babel-transform:start', file.opts.filename);
      const entrypoint = {
        name: file.opts.filename,
        code: file.code,
        only: ['__linariaPreval']
      };
      const prepareStageResult = prepareForEvalSync(babel, cache, syncResolve, entrypoint, {
        root: file.opts.root ?? undefined,
        pluginOptions: options
      });
      if (!prepareStageResult || !withLinariaMetadata(prepareStageResult?.metadata)) {
        return;
      }
      const evalStageResult = evalStage(cache, prepareStageResult.code, {
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
          processTemplateExpression(p, file.opts, options, processor => {
            processor.build(valueCache);
            processor.doRuntimeReplacement();
          });
        }
      });

      // We can remove __linariaPreval export and all related code
      const prevalExport = file.path.scope.getData('__linariaPreval')?.findParent(p => p.isExpressionStatement());
      if (prevalExport) {
        removeWithRelated([prevalExport]);
      }
    },
    visitor: {},
    post(file) {
      debug('babel-transform:end', file.opts.filename);
    }
  };
}
//# sourceMappingURL=babel-transform.js.map