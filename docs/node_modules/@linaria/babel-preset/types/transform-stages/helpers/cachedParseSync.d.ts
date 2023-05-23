import type { ParseResult, TransformOptions } from '@babel/core';
import type { Core } from '../../babel';
export default function cachedParseSync(babel: Core, code: string, babelOptions: TransformOptions): ParseResult;
