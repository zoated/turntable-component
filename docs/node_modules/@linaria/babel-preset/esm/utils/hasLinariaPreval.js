export default function hasLinariaPreval(exports) {
  if (!exports || typeof exports !== 'object') {
    return false;
  }
  return '__linariaPreval' in exports;
}
//# sourceMappingURL=hasLinariaPreval.js.map