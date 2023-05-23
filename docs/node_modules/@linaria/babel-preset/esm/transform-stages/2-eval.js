import { createCustomDebug } from '@linaria/logger';
import { getFileIdx } from '@linaria/utils';
import evaluate from '../evaluators';
import hasLinariaPreval from '../utils/hasLinariaPreval';
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
export default function evalStage(cache, code, options) {
  const log = createCustomDebug('transform', getFileIdx(options.filename));
  log('stage-2', `>> evaluate __linariaPreval`);
  const evaluated = evaluate(cache, code, options);
  const linariaPreval = hasLinariaPreval(evaluated.value) ? evaluated.value.__linariaPreval : undefined;
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