"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformCacheCollection = void 0;
class TransformCacheCollection {
  constructor(resolveCache = new Map(), codeCache = new Map(), evalCache = new Map()) {
    this.resolveCache = resolveCache;
    this.codeCache = codeCache;
    this.evalCache = evalCache;
  }
}
exports.TransformCacheCollection = TransformCacheCollection;
//# sourceMappingURL=cache.js.map