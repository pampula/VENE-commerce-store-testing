import { expect } from 'chai';
import chunk from '../src/chunk.js';

describe('chunk', () => {
  it('should split the array into even chunks', () => {
    const result = chunk(['a', 'b', 'c', 'd'], 2);
    expect(result).to.deep.equal([['a', 'b'], ['c', 'd']]);
  });

  it('should split the array into uneven chunks', () => {
    const result = chunk(['a', 'b', 'c', 'd'], 3);
    expect(result).to.deep.equal([['a', 'b', 'c'], ['d']]);
  });

  it('should handle an empty array', () => {
    const result = chunk([], 2);
    expect(result).to.deep.equal([]);
  });

  it('should handle a size greater than the array length', () => {
    const result = chunk(['a', 'b', 'c', 'd'], 6);
    expect(result).to.deep.equal([['a', 'b', 'c', 'd']]);
  });

  it('should handle a size less than or equal to 0', () => {
    const result = chunk(['a', 'b', 'c', 'd'], 0);
    expect(result).to.deep.equal([]);

    const result2 = chunk(['a', 'b', 'c', 'd'], -1);
    expect(result2).to.deep.equal([]);
  });

  it('should handle a null or undefined array', () => {
    const result = chunk(null, 2);
    expect(result).to.deep.equal([]);

    const result2 = chunk(undefined, 2);
    expect(result2).to.deep.equal([]);
  });
});
