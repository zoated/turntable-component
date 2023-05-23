import type { BabelFileResult, TransformOptions } from '@babel/core';
import type { Core } from '../babel';
import type { Options, ValueCache } from '../types';
/**
 * Parses the specified file, finds tags, applies run-time replacements,
 * removes dead code.
 */
export default function prepareForRuntime(babel: Core, code: string, valueCache: ValueCache, options: Options, babelConfig: TransformOptions): BabelFileResult;
