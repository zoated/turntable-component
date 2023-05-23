import type core from '@babel/core';
import type { PluginObj } from '@babel/core';
import type { IState } from '@linaria/utils';
declare type Core = typeof core;
export interface IShakerOptions {
    keepSideEffects?: boolean;
    ifUnknownExport?: 'error' | 'ignore' | 'reexport-all' | 'skip-shaking';
    onlyExports: string[];
}
export interface IShakerMetadata {
    imports: Map<string, string[]>;
}
export interface IMetadata {
    __linariaShaker: IShakerMetadata;
}
export declare const hasShakerMetadata: (metadata: object | undefined) => metadata is IMetadata;
export default function shakerPlugin(babel: Core, { keepSideEffects, ifUnknownExport, onlyExports, }: IShakerOptions): PluginObj<IState & {
    filename: string;
}>;
export {};
