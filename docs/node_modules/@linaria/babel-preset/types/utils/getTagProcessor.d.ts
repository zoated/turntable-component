import type { NodePath } from '@babel/traverse';
import type { Identifier } from '@babel/types';
import { BaseProcessor } from '@linaria/tags';
import type { IFileContext } from '@linaria/tags';
import type { StrictOptions } from '@linaria/utils';
export default function getTagProcessor(path: NodePath<Identifier>, fileContext: IFileContext, options: Pick<StrictOptions, 'classNameSlug' | 'displayName' | 'evaluate' | 'tagResolver'>): BaseProcessor | null;
