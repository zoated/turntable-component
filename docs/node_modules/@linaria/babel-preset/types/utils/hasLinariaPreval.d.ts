import type { Value } from '@linaria/tags';
export default function hasLinariaPreval(exports: unknown): exports is {
    __linariaPreval: Record<string, () => Value> | null | undefined;
};
