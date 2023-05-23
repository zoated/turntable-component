import type { PluginObj } from '@babel/core';
import type { StrictOptions } from '@linaria/utils';
import type { Core } from '../babel';
import type { IPluginState } from '../types';
export default function collector(babel: Core, options: StrictOptions): PluginObj<IPluginState>;
