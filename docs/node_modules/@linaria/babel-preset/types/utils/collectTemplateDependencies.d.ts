import type { NodePath } from '@babel/traverse';
import type { Expression, TaggedTemplateExpression, TemplateElement } from '@babel/types';
import type { ExpressionValue } from '../types';
/**
 * Only an expression that can be evaluated in the root scope can be
 * used in a Linaria template. This function tries to hoist the expression.
 * @param ex The expression to hoist.
 * @param evaluate If true, we try to statically evaluate the expression.
 * @param addToExport If true, we add the expression to the __linariaPreval.
 */
export declare function extractExpression(ex: NodePath<Expression>, evaluate?: boolean, addToExport?: boolean): Omit<ExpressionValue, 'buildCodeFrameError' | 'source'>;
/**
 * Collects, hoists, and makes lazy all expressions in the given template
 * If evaluate is true, it will try to evaluate the expressions
 */
export default function collectTemplateDependencies(path: NodePath<TaggedTemplateExpression>, evaluate?: boolean): [quasis: TemplateElement[], expressionValues: ExpressionValue[]];
