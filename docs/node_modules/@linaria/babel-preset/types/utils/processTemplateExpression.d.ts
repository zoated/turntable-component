import type { NodePath } from '@babel/traverse';
import type { Identifier } from '@babel/types';
import type { BaseProcessor, IFileContext } from '@linaria/tags';
import type { StrictOptions } from '@linaria/utils';
declare const processTemplateExpression: (p: NodePath<Identifier>, fileContext: IFileContext, options: Pick<StrictOptions, 'classNameSlug' | 'displayName' | 'evaluate' | 'tagResolver'>, emit: (processor: BaseProcessor) => void) => void;
export default processTemplateExpression;
