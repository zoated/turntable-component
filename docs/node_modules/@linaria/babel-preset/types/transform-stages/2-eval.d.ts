import type { ValueCache } from '@linaria/tags';
import type { TransformCacheCollection } from '../cache';
import type { Options } from '../types';
/**
 * Evaluates template dependencies.
 */
export default function evalStage(cache: TransformCacheCollection, code: string, options: Pick<Options, 'filename' | 'pluginOptions'>): [ValueCache, string[]] | null;
