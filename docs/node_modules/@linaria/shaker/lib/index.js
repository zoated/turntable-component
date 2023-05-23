"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "shakerPlugin", {
  enumerable: true,
  get: function () {
    return _shakerPlugin.default;
  }
});
var _utils = require("@linaria/utils");
var _shakerPlugin = _interopRequireWildcard(require("./plugins/shaker-plugin"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const configCache = new Map();
const getShakerConfig = only => {
  const sortedOnly = [...(only !== null && only !== void 0 ? only : [])];
  sortedOnly.sort();
  const key = sortedOnly.join('\0');
  if (configCache.has(key)) {
    return configCache.get(key);
  }
  const config = {
    ast: true,
    caller: {
      name: 'linaria'
    },
    targets: {
      node: 'current',
      esmodules: false
    },
    plugins: [[require.resolve('./plugins/shaker-plugin'), {
      onlyExports: sortedOnly
    }], require.resolve('@babel/plugin-transform-modules-commonjs')]
  };
  configCache.set(key, config);
  return config;
};
const shaker = (filename, options, text, only, babel) => {
  var _transformed$code;
  const transformOptions = (0, _utils.loadBabelOptions)(babel, filename, (0, _utils.buildOptions)(options === null || options === void 0 ? void 0 : options.babelOptions, getShakerConfig(only)));
  const transformed = babel.transformSync(text, {
    ...transformOptions,
    filename
  });
  if (!transformed || !(0, _shakerPlugin.hasShakerMetadata)(transformed.metadata)) {
    throw new Error(`${filename} has no shaker metadata`);
  }
  return [(_transformed$code = transformed.code) !== null && _transformed$code !== void 0 ? _transformed$code : '', transformed.metadata.__linariaShaker.imports];
};
var _default = shaker;
exports.default = _default;
//# sourceMappingURL=index.js.map