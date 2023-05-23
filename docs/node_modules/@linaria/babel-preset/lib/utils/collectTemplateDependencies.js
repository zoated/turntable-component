"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectTemplateDependencies;
exports.extractExpression = extractExpression;
var _template = require("@babel/template");
var _types = require("@babel/types");
var _logger = require("@linaria/logger");
var _tags = require("@linaria/tags");
var _utils = require("@linaria/utils");
var _types2 = require("../types");
var _getSource = _interopRequireDefault(require("./getSource"));
var _vlueToLiteral = _interopRequireDefault(require("./vlueToLiteral"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint @typescript-eslint/no-use-before-define: ["error", { "functions": false }] */

/**
 * This file is a visitor that checks TaggedTemplateExpressions and look for Linaria css or styled templates.
 * For each template it makes a list of dependencies, try to evaluate expressions, and if it is not possible, mark them as lazy dependencies.
 */

const createId = (name, loc) => ({
  type: 'Identifier',
  name,
  loc
});
function staticEval(ex, evaluate = false) {
  if (!evaluate) return undefined;
  const result = ex.evaluate();
  if (result.confident && !(0, _tags.hasMeta)(result.value)) {
    return [result.value];
  }
  return undefined;
}
const expressionDeclarationTpl = (0, _template.statement)('const %%expId%% = /*#__PURE__*/ () => %%expression%%', {
  preserveComments: true
});
const unsupported = (ex, reason) => ex.buildCodeFrameError(`This ${ex.isIdentifier() ? 'identifier' : 'expression'} cannot be used in the template${reason ? `, because it ${reason}` : ''}.`);
function getUidInRootScope(path) {
  const {
    name
  } = path.node;
  const rootScope = path.scope.getProgramParent();
  if (rootScope.hasBinding(name)) {
    return rootScope.generateUid(name);
  }
  return name;
}
function hoistVariableDeclarator(ex) {
  if (!ex.scope.parent) {
    // It is already in the root scope
    return;
  }
  const referencedIdentifiers = (0, _utils.findIdentifiers)([ex], 'referenced');
  referencedIdentifiers.forEach(identifier => {
    if (identifier.isIdentifier()) {
      hoistIdentifier(identifier);
    }
  });
  const bindingIdentifiers = (0, _utils.findIdentifiers)([ex], 'binding');
  bindingIdentifiers.forEach(path => {
    const newName = getUidInRootScope(path);
    if (newName !== path.node.name) {
      path.scope.rename(path.node.name, newName);
    }
  });
  const rootScope = ex.scope.getProgramParent();
  const statementInRoot = ex.findParent(p => {
    var _p$parentPath;
    return ((_p$parentPath = p.parentPath) === null || _p$parentPath === void 0 ? void 0 : _p$parentPath.isProgram()) === true;
  });
  const declaration = {
    type: 'VariableDeclaration',
    kind: 'let',
    declarations: [(0, _types.cloneNode)(ex.node)]
  };
  const [inserted] = statementInRoot.insertBefore(declaration);
  (0, _utils.referenceAll)(inserted);
  rootScope.registerDeclaration(inserted);
}
function hoistIdentifier(idPath) {
  if (!idPath.isReferenced()) {
    throw unsupported(idPath);
  }
  const binding = idPath.scope.getBinding(idPath.node.name);
  if (!binding) {
    // It's something strange
    throw unsupported(idPath, 'is undefined');
  }
  if (binding.kind === 'module') {
    // Modules are global by default
    return;
  }
  if (!['var', 'let', 'const', 'hoisted'].includes(binding.kind)) {
    // This is not a variable, we can't hoist it
    throw unsupported(binding.path, 'is a function parameter');
  }
  const {
    scope,
    path: bindingPath
  } = binding;
  // parent here can be null or undefined in different versions of babel
  if (!scope.parent) {
    // The variable is already in the root scope
    return;
  }
  if (bindingPath.isVariableDeclarator()) {
    hoistVariableDeclarator(bindingPath);
    return;
  }
  throw unsupported(idPath);
}
function getOrAddLinariaPreval(scope) {
  const rootScope = scope.getProgramParent();
  let object = rootScope.getData('__linariaPreval');
  if (object) {
    return object;
  }
  const prevalExport = {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        object: createId('exports'),
        property: createId('__linariaPreval'),
        computed: false
      },
      right: {
        type: 'ObjectExpression',
        properties: []
      }
    }
  };
  const programPath = rootScope.path;
  const [inserted] = programPath.pushContainer('body', [prevalExport]);
  object = inserted.get('expression.right');
  rootScope.setData('__linariaPreval', object);
  return object;
}
function addIdentifierToLinariaPreval(scope, name) {
  const rootScope = scope.getProgramParent();
  const object = getOrAddLinariaPreval(rootScope);
  const newProperty = {
    type: 'ObjectProperty',
    key: createId(name),
    value: createId(name),
    computed: false,
    shorthand: false
  };
  const [inserted] = object.pushContainer('properties', [newProperty]);
  (0, _utils.reference)(inserted.get('value'));
}

/**
 * Only an expression that can be evaluated in the root scope can be
 * used in a Linaria template. This function tries to hoist the expression.
 * @param ex The expression to hoist.
 * @param evaluate If true, we try to statically evaluate the expression.
 * @param addToExport If true, we add the expression to the __linariaPreval.
 */
function extractExpression(ex, evaluate = false, addToExport = true) {
  if (ex.isLiteral() && ('value' in ex.node || ex.node.type === 'NullLiteral')) {
    return {
      ex: ex.node,
      kind: _types2.ValueType.CONST,
      value: ex.node.type === 'NullLiteral' ? null : ex.node.value
    };
  }
  const {
    loc
  } = ex.node;
  const rootScope = ex.scope.getProgramParent();
  const statementInRoot = ex.findParent(p => {
    var _p$parentPath2;
    return ((_p$parentPath2 = p.parentPath) === null || _p$parentPath2 === void 0 ? void 0 : _p$parentPath2.isProgram()) === true;
  });
  const isFunction = ex.isFunctionExpression() || ex.isArrowFunctionExpression();

  // Generate next _expN name
  const expUid = rootScope.generateUid('exp');
  const evaluated = staticEval(ex, evaluate);
  if (!evaluated) {
    // If expression is not statically evaluable,
    // we need to hoist all its referenced identifiers

    // Collect all referenced identifiers
    (0, _utils.findIdentifiers)([ex], 'referenced').forEach(id => {
      if (!id.isIdentifier()) return;

      // Try to evaluate and inline them…
      const evaluatedId = staticEval(id, evaluate);
      if (evaluatedId) {
        (0, _utils.mutate)(id, p => {
          p.replaceWith((0, _vlueToLiteral.default)(evaluatedId[0], ex));
        });
      } else {
        // … or hoist them to the root scope
        hoistIdentifier(id);
      }
    });
  }
  const kind = isFunction ? _types2.ValueType.FUNCTION : _types2.ValueType.LAZY;

  // Declare _expN const with the lazy expression
  const declaration = expressionDeclarationTpl({
    expId: createId(expUid),
    expression: evaluated ? (0, _vlueToLiteral.default)(evaluated[0], ex) : (0, _types.cloneNode)(ex.node)
  });

  // Insert the declaration as close as possible to the original expression
  const [inserted] = statementInRoot.insertBefore(declaration);
  (0, _utils.referenceAll)(inserted);
  rootScope.registerDeclaration(inserted);

  // Replace the expression with the _expN() call
  (0, _utils.mutate)(ex, p => {
    p.replaceWith({
      type: 'CallExpression',
      callee: createId(expUid),
      arguments: []
    });
  });
  if (addToExport) {
    addIdentifierToLinariaPreval(rootScope, expUid);
  }

  // eslint-disable-next-line no-param-reassign
  ex.node.loc = loc;
  return {
    kind,
    ex: createId(expUid, loc)
  };
}

/**
 * Collects, hoists, and makes lazy all expressions in the given template
 * If evaluate is true, it will try to evaluate the expressions
 */
function collectTemplateDependencies(path, evaluate = false) {
  const quasi = path.get('quasi');
  const quasis = quasi.get('quasis');
  const expressions = quasi.get('expressions');
  (0, _logger.debug)('template-parse:identify-expressions', expressions.length);
  const expressionValues = expressions.map(ex => {
    const buildCodeFrameError = ex.buildCodeFrameError.bind(ex);
    const source = (0, _getSource.default)(ex);
    if (!ex.isExpression()) {
      throw buildCodeFrameError(`The expression '${source}' is not supported.`);
    }
    const extracted = extractExpression(ex, evaluate);
    return {
      ...extracted,
      source,
      buildCodeFrameError
    };
  });
  return [quasis.map(p => p.node), expressionValues];
}
//# sourceMappingURL=collectTemplateDependencies.js.map