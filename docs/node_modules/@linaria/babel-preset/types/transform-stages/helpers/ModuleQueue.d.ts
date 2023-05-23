export interface IEntrypoint {
    code: string;
    name: string;
    only: string[];
}
declare type Node = [entrypoint: IEntrypoint, stack: string[], refCount?: number];
export declare class ModuleQueue {
    private data;
    private keys;
    private readonly log;
    constructor(entrypoint: IEntrypoint);
    private get size();
    private delete;
    private heapifyDown;
    private heapifyUp;
    private increaseKey;
    private swap;
    private updateKey;
    dequeue(): Node | undefined;
    enqueue(el: Node): void;
    isEmpty(): boolean;
}
export {};
