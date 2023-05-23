"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldKeepSideEffect;
const EXT_REGEX = /\.[0-9a-z]+$/;
const ALLOWED_EXTENSIONS = ['.js', '.cjs', '.mjs'];
function shouldKeepSideEffect(importPath) {
  const [ext] = importPath.match(EXT_REGEX) || [''];
  return ext === '' || ALLOWED_EXTENSIONS.includes(ext);
}
//# sourceMappingURL=shouldKeepSideEffect.js.map