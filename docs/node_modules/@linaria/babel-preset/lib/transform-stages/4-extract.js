"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractStage;
exports.transformUrl = transformUrl;
var _path = _interopRequireDefault(require("path"));
var _sourceMap = require("source-map");
var _stylis = _interopRequireDefault(require("stylis"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const STYLIS_DECLARATION = 1;
const posixSep = _path.default.posix.sep;
function transformUrl(url, outputFilename, sourceFilename, platformPath = _path.default) {
  // Replace asset path with new path relative to the output CSS
  const relative = platformPath.relative(platformPath.dirname(outputFilename),
  // Get the absolute path to the asset from the path relative to the JS file
  platformPath.resolve(platformPath.dirname(sourceFilename), url));
  if (platformPath.sep === posixSep) {
    return relative;
  }
  return relative.split(platformPath.sep).join(posixSep);
}
function extractCssFromAst(rules, originalCode, options) {
  const mappings = [];
  let cssText = '';
  let preprocessor;
  if (typeof options.preprocessor === 'function') {
    // eslint-disable-next-line prefer-destructuring
    preprocessor = options.preprocessor;
  } else {
    switch (options.preprocessor) {
      case 'none':
        preprocessor = (selector, text) => `${selector} {${text}}\n`;
        break;
      case 'stylis':
      default:
        _stylis.default.use(null)((context, decl) => {
          const {
            outputFilename
          } = options;
          if (context === STYLIS_DECLARATION && outputFilename) {
            // When writing to a file, we need to adjust the relative paths inside url(..) expressions
            // It'll allow css-loader to resolve an imported asset properly
            return decl.replace(/\b(url\((["']?))(\.[^)]+?)(\2\))/g, (match, p1, p2, p3, p4) => p1 + transformUrl(p3, outputFilename, options.filename) + p4);
          }
          return decl;
        });
        preprocessor = _stylis.default;
    }
  }
  Object.keys(rules).forEach((selector, index) => {
    mappings.push({
      generated: {
        line: index + 1,
        column: 0
      },
      original: rules[selector].start,
      name: selector,
      source: ''
    });
    if (rules[selector].atom) {
      // For atoms, we just directly insert cssText, to give the atomizer full control over the rules
      cssText += `${rules[selector].cssText}\n`;
    } else {
      // Run each rule through stylis to support nesting
      cssText += `${preprocessor(selector, rules[selector].cssText)}\n`;
    }
  });
  return {
    cssText,
    rules,
    get cssSourceMapText() {
      if (mappings !== null && mappings !== void 0 && mappings.length) {
        const generator = new _sourceMap.SourceMapGenerator({
          file: options.filename.replace(/\.js$/, '.css')
        });
        mappings.forEach(mapping => generator.addMapping({
          ...mapping,
          source: options.filename
        }));
        generator.setSourceContent(options.filename, originalCode);
        return generator.toString();
      }
      return '';
    }
  };
}

/**
 * Extract artifacts (e.g. CSS) from processors
 */
function extractStage(processors, originalCode, options) {
  let allRules = {};
  const allReplacements = [];
  processors.forEach(processor => {
    processor.artifacts.forEach(artifact => {
      if (artifact[0] !== 'css') return;
      const [rules, replacements] = artifact[1];
      allRules = {
        ...allRules,
        ...rules
      };
      allReplacements.push(...replacements);
    });
  });
  return {
    ...extractCssFromAst(allRules, originalCode, options),
    replacements: allReplacements
  };
}
//# sourceMappingURL=4-extract.js.map