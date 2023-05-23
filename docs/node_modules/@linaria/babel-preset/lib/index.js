"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  loadLinariaOptions: true,
  slugify: true,
  preeval: true,
  collectTemplateDependencies: true,
  withLinariaMetadata: true,
  Module: true,
  DefaultModuleImplementation: true,
  transform: true,
  prepareCode: true,
  transformUrl: true,
  isNode: true,
  getTagProcessor: true,
  getVisitorKeys: true,
  peek: true,
  processTemplateExpression: true,
  TransformCacheCollection: true
};
Object.defineProperty(exports, "DefaultModuleImplementation", {
  enumerable: true,
  get: function () {
    return _module.DefaultModuleImplementation;
  }
});
Object.defineProperty(exports, "Module", {
  enumerable: true,
  get: function () {
    return _module.default;
  }
});
Object.defineProperty(exports, "TransformCacheCollection", {
  enumerable: true,
  get: function () {
    return _cache.TransformCacheCollection;
  }
});
Object.defineProperty(exports, "collectTemplateDependencies", {
  enumerable: true,
  get: function () {
    return _collectTemplateDependencies.default;
  }
});
exports.default = linaria;
Object.defineProperty(exports, "getTagProcessor", {
  enumerable: true,
  get: function () {
    return _getTagProcessor.default;
  }
});
Object.defineProperty(exports, "getVisitorKeys", {
  enumerable: true,
  get: function () {
    return _getVisitorKeys.default;
  }
});
Object.defineProperty(exports, "isNode", {
  enumerable: true,
  get: function () {
    return _isNode.default;
  }
});
Object.defineProperty(exports, "loadLinariaOptions", {
  enumerable: true,
  get: function () {
    return _loadLinariaOptions.default;
  }
});
Object.defineProperty(exports, "peek", {
  enumerable: true,
  get: function () {
    return _peek.default;
  }
});
Object.defineProperty(exports, "preeval", {
  enumerable: true,
  get: function () {
    return _preeval.default;
  }
});
Object.defineProperty(exports, "prepareCode", {
  enumerable: true,
  get: function () {
    return _prepareForEval.prepareCode;
  }
});
Object.defineProperty(exports, "processTemplateExpression", {
  enumerable: true,
  get: function () {
    return _processTemplateExpression.default;
  }
});
Object.defineProperty(exports, "slugify", {
  enumerable: true,
  get: function () {
    return _utils.slugify;
  }
});
Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function () {
    return _transform.default;
  }
});
Object.defineProperty(exports, "transformUrl", {
  enumerable: true,
  get: function () {
    return _extract.transformUrl;
  }
});
Object.defineProperty(exports, "withLinariaMetadata", {
  enumerable: true,
  get: function () {
    return _withLinariaMetadata.default;
  }
});
var _logger = require("@linaria/logger");
var _babelTransform = _interopRequireDefault(require("./plugins/babel-transform"));
var _loadLinariaOptions = _interopRequireDefault(require("./transform-stages/helpers/loadLinariaOptions"));
var _utils = require("@linaria/utils");
var _preeval = _interopRequireDefault(require("./plugins/preeval"));
var _collectTemplateDependencies = _interopRequireWildcard(require("./utils/collectTemplateDependencies"));
Object.keys(_collectTemplateDependencies).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _collectTemplateDependencies[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _collectTemplateDependencies[key];
    }
  });
});
var _withLinariaMetadata = _interopRequireDefault(require("./utils/withLinariaMetadata"));
var _module = _interopRequireWildcard(require("./module"));
var _transform = _interopRequireDefault(require("./transform"));
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _prepareForEval = require("./transform-stages/1-prepare-for-eval");
var _extract = require("./transform-stages/4-extract");
var _isNode = _interopRequireDefault(require("./utils/isNode"));
var _getTagProcessor = _interopRequireDefault(require("./utils/getTagProcessor"));
var _getVisitorKeys = _interopRequireDefault(require("./utils/getVisitorKeys"));
var _peek = _interopRequireDefault(require("./utils/peek"));
var _processTemplateExpression = _interopRequireDefault(require("./utils/processTemplateExpression"));
var _cache = require("./cache");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * File defines babel prest for Linaria.
 * It uses ./extract function that is an entry point for styles extraction.
 * It also bypass babel options defined in Linaria config file with it's defaults (see ./utils/loadOptions).
 */

function isEnabled(caller) {
  return (caller === null || caller === void 0 ? void 0 : caller.name) !== 'linaria' || caller.evaluate === true;
}
function linaria(babel, options) {
  if (!babel.caller(isEnabled)) {
    return {};
  }
  (0, _logger.debug)('options', JSON.stringify(options));
  return {
    plugins: [[_babelTransform.default, (0, _loadLinariaOptions.default)(options)]]
  };
}
//# sourceMappingURL=index.js.map