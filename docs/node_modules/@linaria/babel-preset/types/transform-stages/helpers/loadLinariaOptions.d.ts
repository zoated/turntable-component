import type { StrictOptions } from '@linaria/utils';
import type { Stage } from '../../types';
export declare type PluginOptions = StrictOptions & {
    configFile?: string;
    stage?: Stage;
};
export default function loadLinariaOptions(overrides?: Partial<PluginOptions>): StrictOptions;
