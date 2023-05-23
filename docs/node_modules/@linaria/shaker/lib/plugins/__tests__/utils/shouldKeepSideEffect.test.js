"use strict";

var _shouldKeepSideEffect = _interopRequireDefault(require("../../utils/shouldKeepSideEffect"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('shouldKeepSideEffect', () => {
  it('allows modules', () => {
    expect((0, _shouldKeepSideEffect.default)('@babel/runtime')).toBeTruthy();
    expect((0, _shouldKeepSideEffect.default)('regenerator-runtime')).toBeTruthy();
    expect((0, _shouldKeepSideEffect.default)('./side-effect')).toBeTruthy();
  });
  it('allows extensions', () => {
    expect((0, _shouldKeepSideEffect.default)('./side-effect.js')).toBeTruthy();
    expect((0, _shouldKeepSideEffect.default)('./side-effect.cjs')).toBeTruthy();
    expect((0, _shouldKeepSideEffect.default)('./side-effect.mjs')).toBeTruthy();
    expect((0, _shouldKeepSideEffect.default)('regenerator-runtime/runtime.js')).toBeTruthy();
  });
  it('skips assets', () => {
    expect((0, _shouldKeepSideEffect.default)('./asset.css')).toBeFalsy();
    expect((0, _shouldKeepSideEffect.default)('./asset.scss')).toBeFalsy();
  });
});
//# sourceMappingURL=shouldKeepSideEffect.test.js.map