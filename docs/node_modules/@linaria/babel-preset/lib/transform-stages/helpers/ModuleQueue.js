"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModuleQueue = void 0;
var _path = require("path");
var _logger = require("@linaria/logger");
var _utils = require("@linaria/utils");
const peek = arr => arr.length > 0 ? arr[arr.length - 1] : undefined;
const hasLessPriority = ([{
  name: nameA
}, stackA, refCountA = 0], [{
  name: nameB
}, stackB, refCountB = 0]) => {
  const firstA = peek(stackA);
  const firstB = peek(stackB);
  if (refCountA === refCountB && firstA && firstB) {
    const distanceA = (0, _path.relative)(firstA, nameA).split(_path.sep).length;
    const distanceB = (0, _path.relative)(firstB, nameB).split(_path.sep).length;
    return distanceA > distanceB;
  }
  return refCountA > refCountB;
};
const nameOf = ([entrypoint]) => entrypoint.name;
const keyOf = ([entrypoint]) => {
  return entrypoint.name;
};
class ModuleQueue {
  data = [];
  keys = new Map();
  constructor(entrypoint) {
    this.data = [[entrypoint, []]];
    this.log = (0, _logger.createCustomDebug)('transform', (0, _utils.getFileIdx)(entrypoint.name));
    this.log('queue', 'Created for entrypoint %s', entrypoint.name);
  }
  get size() {
    return this.data.length;
  }
  delete(key) {
    const idx = this.keys.get(key);
    if (idx === undefined) return;
    if (idx === this.size - 1) {
      this.data.pop();
      this.keys.delete(key);
      return;
    }
    if (this.size <= 1) {
      this.data = [];
      this.keys.clear();
      return;
    }
    this.data[idx] = this.data.pop();
    this.keys.delete(key);
    this.updateKey(idx + 1);
    this.heapifyDown(1);
    this.heapifyUp(this.size);
  }
  heapifyDown(i = 1) {
    const leftIdx = 2 * i;
    const rightIdx = 2 * i + 1;
    let largestIdx = i;
    if (leftIdx <= this.size && hasLessPriority(this.data[largestIdx - 1], this.data[leftIdx - 1])) {
      largestIdx = leftIdx;
    }
    if (rightIdx <= this.size && hasLessPriority(this.data[largestIdx - 1], this.data[rightIdx - 1])) {
      largestIdx = rightIdx;
    }
    if (largestIdx !== i) {
      this.swap(i, largestIdx);
      this.heapifyDown(largestIdx);
    }
  }
  heapifyUp(i) {
    let idx = i;
    while (idx > 1 && hasLessPriority(this.data[Math.floor(idx / 2) - 1], this.data[idx - 1])) {
      this.swap(Math.floor(idx / 2), idx);
      idx = Math.floor(idx / 2);
    }
  }
  increaseKey(i, el) {
    this.data[i - 1] = el;
    this.updateKey(i);
    this.heapifyUp(i);
  }
  swap(i1, i2) {
    const tmp = this.data[i1 - 1];
    this.data[i1 - 1] = this.data[i2 - 1];
    this.data[i2 - 1] = tmp;
    this.updateKey(i1);
    this.updateKey(i2);
  }
  updateKey(i) {
    this.keys.set(keyOf(this.data[i - 1]), i - 1);
  }
  dequeue() {
    if (this.size === 0) return undefined;
    const max = this.data[0];
    if (this.size === 1) {
      this.data = [];
      this.keys.clear();
      this.log('queue', 'Dequeued %s', nameOf(max));
      return max;
    }
    const last = this.data.pop();
    if (last !== undefined) {
      this.data[0] = last;
      this.updateKey(1);
      this.heapifyDown(1);
    }
    this.keys.delete(keyOf(max));
    this.log('queue', 'Dequeued %s: %o', nameOf(max), this.data.map(nameOf));
    return max;
  }
  enqueue(el) {
    const key = keyOf(el);
    const idx = this.keys.get(key);
    if (idx !== undefined) {
      const [entrypoint,, refCount = 0] = this.data[idx];
      this.delete(key);
      this.log('queue', 'Increase refCount of %s to %d', key, refCount + 1);
      const replacement = {
        ...entrypoint,
        only: [...new Set([...entrypoint.only, ...el[0].only])]
      };
      this.enqueue([replacement, el[1], refCount + 1]);
      return;
    }
    this.increaseKey(this.size + 1, el);
    this.log('queue', 'Enqueued %s: %o', nameOf(el), this.data.map(nameOf));
  }
  isEmpty() {
    return this.size === 0;
  }
}
exports.ModuleQueue = ModuleQueue;
//# sourceMappingURL=ModuleQueue.js.map