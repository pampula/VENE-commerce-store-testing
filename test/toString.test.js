import { expect } from 'chai';
import toString from '../src/toString.js';

describe('toString', () => {
  /*
  it('should return an empty string for null and undefined values', () => {
    expect(toString(null)).to.equal('');
    expect(toString(undefined)).to.equal('');
  });
  */

  it('should preserve the sign of -0', () => {
    expect(toString(-0)).to.equal('-0');
  });

  it('should convert arrays to strings recursively', () => {
    expect(toString([1, 2, 3])).to.equal('1,2,3');
    expect(toString(['a', [2, ['b']], 'c'])).to.equal('a,2,b,c');
  });

  it('should convert symbols to strings', () => {
    const symbol = Symbol('test');
    expect(toString(symbol)).to.equal(symbol.toString());
  });

  it('should convert other values to strings', () => {
    expect(toString(42)).to.equal('42');
    expect(toString(true)).to.equal('true');
    expect(toString({ key: 'value' })).to.equal('[object Object]');
  });

  it('should preserve the sign of -0 in complex cases', () => {
    expect(toString(-0.0001)).to.equal('-0.0001');
  });

  it('should handle special cases like Infinity', () => {
    expect(toString(Infinity)).to.equal('Infinity');
    expect(toString(-Infinity)).to.equal('-Infinity');
  });
});
