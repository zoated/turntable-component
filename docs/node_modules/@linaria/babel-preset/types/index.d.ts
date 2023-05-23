/**
 * File defines babel prest for Linaria.
 * It uses ./extract function that is an entry point for styles extraction.
 * It also bypass babel options defined in Linaria config file with it's defaults (see ./utils/loadOptions).
 */
import type { ConfigAPI } from '@babel/core';
import transform from './plugins/babel-transform';
import type { PluginOptions } from './transform-stages/helpers/loadLinariaOptions';
export { slugify } from '@linaria/utils';
export { default as preeval } from './plugins/preeval';
export * from './utils/collectTemplateDependencies';
export { default as collectTemplateDependencies } from './utils/collectTemplateDependencies';
export { default as withLinariaMetadata } from './utils/withLinariaMetadata';
export { default as Module, DefaultModuleImplementation } from './module';
export { default as transform } from './transform';
export * from './types';
export { default as loadLinariaOptions } from './transform-stages/helpers/loadLinariaOptions';
export type { PluginOptions } from './transform-stages/helpers/loadLinariaOptions';
export { prepareCode } from './transform-stages/1-prepare-for-eval';
export { transformUrl } from './transform-stages/4-extract';
export { default as isNode } from './utils/isNode';
export { default as getTagProcessor } from './utils/getTagProcessor';
export { default as getVisitorKeys } from './utils/getVisitorKeys';
export type { VisitorKeys } from './utils/getVisitorKeys';
export { default as peek } from './utils/peek';
export { default as processTemplateExpression } from './utils/processTemplateExpression';
export { TransformCacheCollection } from './cache';
export default function linaria(babel: ConfigAPI, options: PluginOptions): {
    plugins?: undefined;
} | {
    plugins: (import("@linaria/utils").StrictOptions | typeof transform)[][];
};
