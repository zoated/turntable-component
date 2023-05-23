const cache = new WeakMap();
export default function cachedParseSync(babel, code, babelOptions) {
  const fileCache = cache.get(babelOptions) ?? new Map();
  if (fileCache.has(code)) {
    return fileCache.get(code);
  }
  const file = babel.parseSync(code, babelOptions);
  fileCache.set(code, file);
  cache.set(babelOptions, fileCache);
  return file;
}
//# sourceMappingURL=cachedParseSync.js.map