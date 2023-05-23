/**
 * This file is an entry point for module evaluation for getting lazy dependencies.
 */
import type { TransformCacheCollection } from '../cache';
import type { Options } from '../types';
export default function evaluate(cache: TransformCacheCollection, code: string, options: Pick<Options, 'filename' | 'pluginOptions'>): {
    value: unknown;
    dependencies: string[];
    processors: import("packages/tags/types").BaseProcessor[];
};
