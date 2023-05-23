/**
 * This file exposes transform function that:
 * - parse the passed code to AST
 * - transforms the AST using Linaria babel preset ('./babel/index.js) and additional config defined in Linaria config file or passed to bundler configuration.
 * - runs generated CSS files through default of user-defined preprocessor
 * - generates source maps for CSS files
 * - return transformed code (without Linaria template literals), generated CSS, source maps and babel metadata from transform step.
 */
import type { TransformOptions } from '@babel/core';
import { TransformCacheCollection } from './cache';
import type { Options, Result } from './types';
export declare function transformSync(originalCode: string, options: Options, syncResolve: (what: string, importer: string, stack: string[]) => string, babelConfig?: TransformOptions, cache?: TransformCacheCollection, eventEmitter?: (ev: unknown) => void): Result;
export default function transform(originalCode: string, options: Options, asyncResolve: (what: string, importer: string, stack: string[]) => Promise<string | null>, babelConfig?: TransformOptions, cache?: TransformCacheCollection, eventEmitter?: (ev: unknown) => void): Promise<Result>;
