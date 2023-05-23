"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cachedParseSync;
const cache = new WeakMap();
function cachedParseSync(babel, code, babelOptions) {
  var _cache$get;
  const fileCache = (_cache$get = cache.get(babelOptions)) !== null && _cache$get !== void 0 ? _cache$get : new Map();
  if (fileCache.has(code)) {
    return fileCache.get(code);
  }
  const file = babel.parseSync(code, babelOptions);
  fileCache.set(code, file);
  cache.set(babelOptions, fileCache);
  return file;
}
//# sourceMappingURL=cachedParseSync.js.map