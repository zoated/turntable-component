export class TransformCacheCollection {
  constructor(resolveCache = new Map(), codeCache = new Map(), evalCache = new Map()) {
    this.resolveCache = resolveCache;
    this.codeCache = codeCache;
    this.evalCache = evalCache;
  }
}
//# sourceMappingURL=cache.js.map