/**
 * This is a custom implementation for the module system for evaluating code,
 * used for resolving values for dependencies interpolated in `css` or `styled`.
 *
 * This serves 2 purposes:
 * - Avoid leakage from evaluated code to module cache in current context, e.g. `babel-register`
 * - Allow us to invalidate the module cache without affecting other stuff, necessary for rebuilds
 *
 * We also use it to transpile the code with Babel by default.
 * We also store source maps for it to provide correct error stacktraces.
 *
 */
/// <reference types="node" />
import NativeModule from 'module';
import type { BabelFileResult } from '@babel/core';
import type { CustomDebug } from '@linaria/logger';
import type { BaseProcessor } from '@linaria/tags';
import type { StrictOptions } from '@linaria/utils';
import { TransformCacheCollection } from './cache';
declare type HiddenModuleMembers = {
    _extensions: {
        [key: string]: () => void;
    };
    _nodeModulePaths(filename: string): string[];
    _resolveFilename: (id: string, options: {
        id: string;
        filename: string;
        paths: string[];
    }) => string;
};
export declare const DefaultModuleImplementation: typeof NativeModule & HiddenModuleMembers;
declare class Module {
    #private;
    private debuggerDepth;
    private parentModule?;
    private moduleImpl;
    readonly idx: number;
    id: string;
    filename: string;
    options: StrictOptions;
    imports: Map<string, string[]> | null;
    extensions: string[];
    dependencies: string[] | null;
    tagProcessors: BaseProcessor[];
    transform: ((text: string) => BabelFileResult | null) | null;
    debug: CustomDebug;
    constructor(filename: string, options: StrictOptions, cache?: TransformCacheCollection, debuggerDepth?: number, parentModule?: Module | undefined, moduleImpl?: HiddenModuleMembers);
    get exports(): unknown;
    set exports(value: unknown);
    resolve: (id: string) => string;
    require: {
        (id: string): unknown;
        resolve: (id: string) => string;
        ensure: () => void;
    };
    evaluate(source: string): void;
}
export default Module;
