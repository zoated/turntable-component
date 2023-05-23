import type Module from './module';
import type { ITransformFileResult } from './types';
export declare class TransformCacheCollection {
    readonly resolveCache: Map<string, string>;
    readonly codeCache: Map<string, {
        imports: Map<string, string[]> | null;
        only: string[];
        result: ITransformFileResult;
    }>;
    readonly evalCache: Map<string, Module>;
    constructor(resolveCache?: Map<string, string>, codeCache?: Map<string, {
        imports: Map<string, string[]> | null;
        only: string[];
        result: ITransformFileResult;
    }>, evalCache?: Map<string, Module>);
}
