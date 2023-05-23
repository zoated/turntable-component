import type { NodePath } from '@babel/traverse';
import type { Expression } from '@babel/types';
export default function valueToLiteral(value: unknown, ex: NodePath): Expression;
