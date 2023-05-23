/**
 * Collector traverses the AST and collects information about imports and
 * all Linaria template literals.
 */
import type { PluginObj } from '@babel/core';
import type { StrictOptions } from '@linaria/utils';
import type { Core } from '../babel';
import type { IPluginState, ValueCache } from '../types';
export default function collector(babel: Core, options: StrictOptions & {
    values?: ValueCache;
}): PluginObj<IPluginState>;
