import type { Core } from '../babel';
import type { TransformCacheCollection } from '../cache';
import type Module from '../module';
import type { ITransformFileResult, Options } from '../types';
import type { IEntrypoint } from './helpers/ModuleQueue';
export declare function prepareCode(babel: Core, filename: string, originalCode: string, only: string[], options: Pick<Options, 'root' | 'pluginOptions' | 'inputSourceMap'>): [
    code: string,
    imports: Module['imports'],
    metadata?: babel.BabelFileMetadata
];
export declare function prepareForEvalSync(babel: Core, cache: TransformCacheCollection, resolve: (what: string, importer: string, stack: string[]) => string, entrypoint: IEntrypoint, options: Pick<Options, 'root' | 'pluginOptions' | 'inputSourceMap'>): ITransformFileResult | undefined;
/**
 * Parses the specified file and recursively all its dependencies,
 * finds tags, applies eval-time replacements, removes dead code.
 */
export default function prepareForEval(babel: Core, cache: TransformCacheCollection, resolve: (what: string, importer: string, stack: string[]) => Promise<string | null>, entrypoint: IEntrypoint, options: Pick<Options, 'root' | 'pluginOptions' | 'inputSourceMap'>): Promise<ITransformFileResult | undefined>;
