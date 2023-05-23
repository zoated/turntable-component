"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preeval;
var _logger = require("@linaria/logger");
var _utils = require("@linaria/utils");
var _processTemplateExpression = _interopRequireDefault(require("../utils/processTemplateExpression"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * This file is a babel preset used to transform files inside evaluators.
 * It works the same as main `babel/extract` preset, but do not evaluate lazy dependencies.
 */

const isGlobal = id => {
  if (!(0, _utils.nonType)(id)) {
    return false;
  }
  const {
    scope
  } = id;
  const {
    name
  } = id.node;
  return !scope.hasBinding(name) && scope.hasGlobal(name);
};
const forbiddenGlobals = new Set(['XMLHttpRequest', 'clearImmediate', 'clearInterval', 'clearTimeout', 'document', 'fetch', 'localStorage', 'location', 'navigator', 'sessionStorage', 'setImmediate', 'setInterval', 'setTimeout', 'window']);
const isBrowserGlobal = id => {
  return forbiddenGlobals.has(id.node.name) && isGlobal(id);
};
const getPropertyName = path => {
  if (path.isIdentifier()) {
    return path.node.name;
  }
  if (path.isStringLiteral()) {
    return path.node.value;
  }
  return null;
};
function preeval(babel, options) {
  const {
    types: t
  } = babel;
  return {
    name: '@linaria/babel/preeval',
    pre(file) {
      const log = (0, _logger.createCustomDebug)('preeval', (0, _utils.getFileIdx)(file.opts.filename));
      log('start', 'Looking for template literals…');
      this.processors = [];
      file.path.traverse({
        Identifier: p => {
          (0, _processTemplateExpression.default)(p, file.opts, options, processor => {
            processor.doEvaltimeReplacement();
            this.processors.push(processor);
          });
        }
      });
      log('start', 'Strip all JSX and browser related stuff');
      file.path.traverse({
        // JSX can be replaced with a dummy value,
        // but we have to do it after we processed template tags.
        CallExpression: {
          enter(p) {
            if ((0, _utils.isUnnecessaryReactCall)(p)) {
              (0, _utils.JSXElementsRemover)(p);
            }
          }
        },
        JSXElement: {
          enter: _utils.JSXElementsRemover
        },
        JSXFragment: {
          enter: _utils.JSXElementsRemover
        },
        MemberExpression(p, state) {
          const obj = p.get('object');
          const prop = p.get('property');
          if (!obj.isIdentifier({
            name: 'window'
          })) {
            return;
          }
          const name = getPropertyName(prop);
          if (!name) {
            return;
          }
          state.windowScoped.add(name);
          // eslint-disable-next-line no-param-reassign
          state.globals = state.globals.filter(id => {
            if (id.node.name === name) {
              (0, _utils.removeWithRelated)([id]);
              return false;
            }
            return true;
          });
        },
        MetaProperty(p) {
          // Remove all references to `import.meta`
          (0, _utils.removeWithRelated)([p]);
        },
        Identifier(p, state) {
          if (p.find(parent => parent.isTSTypeReference())) {
            // don't mess with TS type references
            return;
          }
          if (isBrowserGlobal(p)) {
            if (p.find(parentPath => parentPath.isUnaryExpression({
              operator: 'typeof'
            }) || parentPath.isTSTypeQuery())) {
              // Ignore `typeof window` expressions
              return;
            }
            if (p.parentPath.isClassProperty()) {
              // ignore class property decls
              return;
            }
            if (p.parentPath.isMemberExpression() && p.key === 'property') {
              // ignore e.g this.fetch()
              // window.fetch will be handled by the windowScoped block below
              return;
            }
            (0, _utils.removeWithRelated)([p]);
            return;
          }
          if (state.windowScoped.has(p.node.name)) {
            (0, _utils.removeWithRelated)([p]);
          } else if (isGlobal(p)) {
            state.globals.push(p);
          }
        }
      }, {
        globals: [],
        windowScoped: new Set()
      });
    },
    visitor: {},
    post(file) {
      const log = (0, _logger.createCustomDebug)('preeval', (0, _utils.getFileIdx)(file.opts.filename));
      if (this.processors.length === 0) {
        log('end', "We didn't find any Linaria template literals");

        // We didn't find any Linaria template literals.
        return;
      }
      this.file.metadata.linaria = {
        processors: this.processors,
        replacements: [],
        rules: {},
        dependencies: []
      };
      const expressions = this.processors.flatMap(processor => processor.dependencies.map(dependency => dependency.ex));
      const linariaPreval = file.path.scope.getData('__linariaPreval');
      if (!linariaPreval) {
        const linariaExport = t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('exports'), t.identifier('__linariaPreval')), t.objectExpression(expressions.map(ex => t.objectProperty(ex, ex, false, true)))));
        file.path.pushContainer('body', linariaExport);
      }
      log('end', '__linariaPreval has been added');
    }
  };
}
//# sourceMappingURL=preeval.js.map