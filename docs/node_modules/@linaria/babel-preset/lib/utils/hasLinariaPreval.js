"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasLinariaPreval;
function hasLinariaPreval(exports) {
  if (!exports || typeof exports !== 'object') {
    return false;
  }
  return '__linariaPreval' in exports;
}
//# sourceMappingURL=hasLinariaPreval.js.map