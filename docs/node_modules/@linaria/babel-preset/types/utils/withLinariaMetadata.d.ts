import type { LinariaMetadata } from '../types';
declare const withLinariaMetadata: (value: unknown) => value is {
    linaria: LinariaMetadata;
};
export default withLinariaMetadata;
