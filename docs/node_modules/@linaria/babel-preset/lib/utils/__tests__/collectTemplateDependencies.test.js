"use strict";

var babel = _interopRequireWildcard(require("@babel/core"));
var _generator = _interopRequireDefault(require("@babel/generator"));
var _dedent = _interopRequireDefault(require("dedent"));
var _stripAnsi = _interopRequireDefault(require("strip-ansi"));
var _collectTemplateDependencies = require("../collectTemplateDependencies");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  File
} = babel;
async function go(code) {
  const parsed = await (0, babel.parseAsync)(code, {
    filename: __filename
  });
  const file = new File({
    filename: __filename
  }, {
    code,
    ast: parsed
  });
  file.path.traverse({
    TemplateLiteral(path) {
      const expressions = path.get('expressions');
      expressions.forEach(exp => {
        if (exp.isExpression()) {
          (0, _collectTemplateDependencies.extractExpression)(exp, true, false);
        }
      });
    }
  });
  return (0, _generator.default)(parsed).code;
}
describe('collectTemplateDependencies', () => {
  it('hoist expressions', async () => {
    const code = (0, _dedent.default)`
      import x from "module";

      function fn() {
        const value = 21;
        const variable = "test";
        const result = "result";
        const template = tag\`${'${value * 2}'}${'${variable}'}${'${(() => result)}'}${'${value * x}'}\`;
      }
    `;
    expect(await go(code)).toMatchSnapshot();
  });
  it('should hoist expressions after imports', async () => {
    const code = (0, _dedent.default)`
      import { styled } from '@linaria/react';
      import slugify from '../__fixtures__/slugify';

      export const Title = styled.h1\`
        &:before {
          content: "${"${slugify('test')}"}"
        }
      \`;
    `;
    expect(await go(code)).toMatchSnapshot();
  });
  it('non-hoistable expression', async () => {
    expect.assertions(1);
    const code = (0, _dedent.default)`
      function fn(arg) {
        {
          const base = "base";
          const variable = base + arg;
          const template = tag\`${'${variable}'}\`;
        }
      }
    `;
    try {
      await go(code);
    } catch (e) {
      expect((0, _stripAnsi.default)(e.message)).toMatchSnapshot();
    }
  });
  it('hoist chain of statements', async () => {
    const code = (0, _dedent.default)`
      import str from "module";

      function fn() {
        {
          const arg = str;
          const variable = arg + "2";
          const template = tag\`${'${variable}'}\`;
        }
      }
    `;
    expect(await go(code)).toMatchSnapshot();
  });
  it('hoistExpression with destructuring', async () => {
    const code = (0, _dedent.default)`
      function fn() {
        const result = "result";
        const { variable } = { variable: result };
        const template = tag\`${'${variable}'}\`;
      }
    `;
    expect(await go(code)).toMatchSnapshot();
  });
  it('hoistExpression with object', async () => {
    const code = (0, _dedent.default)`
      const obj = {
        variable: "test",
      }

      function fn() {
        const template = tag\`${'${obj.variable}'}\`;
      }
    `;
    expect(await go(code)).toMatchSnapshot();
  });
});
//# sourceMappingURL=collectTemplateDependencies.test.js.map