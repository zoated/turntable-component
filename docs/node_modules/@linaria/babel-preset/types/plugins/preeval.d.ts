/**
 * This file is a babel preset used to transform files inside evaluators.
 * It works the same as main `babel/extract` preset, but do not evaluate lazy dependencies.
 */
import type { PluginObj } from '@babel/core';
import type { StrictOptions } from '@linaria/utils';
import type { Core } from '../babel';
import type { IPluginState } from '../types';
export declare type PreevalOptions = Pick<StrictOptions, 'classNameSlug' | 'displayName' | 'evaluate'>;
export default function preeval(babel: Core, options: PreevalOptions): PluginObj<IPluginState>;
