/// <reference types="node" />
import path from 'path';
import type { BaseProcessor, Replacements } from '@linaria/tags';
import type { Rules, Options } from '../types';
export declare function transformUrl(url: string, outputFilename: string, sourceFilename: string, platformPath?: typeof path): string;
/**
 * Extract artifacts (e.g. CSS) from processors
 */
export default function extractStage(processors: BaseProcessor[], originalCode: string, options: Options): {
    replacements: Replacements;
    cssText: string;
    rules: Rules;
    cssSourceMapText: string;
};
