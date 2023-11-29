import { expect } from 'chai';
import memoize from '../src/memoize.js';

describe('memoize', () => {
  it('should memoize the result of the function', () => {
    let callCount = 0;
    const mockFunction = (value) => {
      callCount++;
      return value * 2;
    };

    const memoizedFunction = memoize(mockFunction);

    // First call should invoke the original function.
    expect(memoizedFunction(5)).to.equal(10);
    expect(callCount).to.equal(1);

    // Subsequent calls with the same argument should use the cached result.
    expect(memoizedFunction(5)).to.equal(10);
    expect(callCount).to.equal(1);

    // Call with a different argument should invoke the original function.
    expect(memoizedFunction(10)).to.equal(20);
    expect(callCount).to.equal(2);
  });

  it('should use the resolver function to determine the cache key', () => {
    let callCount = 0;
    const mockFunction = (value) => {
      callCount++;
      return value * 2;
    };

    const resolver = (value) => value % 2 === 0 ? 'even' : 'odd';
    const memoizedFunction = memoize(mockFunction, resolver);

    // First call should invoke the original function.
    expect(memoizedFunction(5)).to.equal(10);
    expect(callCount).to.equal(1);

    // Subsequent calls with the same resolver value should use the cached result.
    expect(memoizedFunction(7)).to.equal(10);
    expect(callCount).to.equal(1);

    // Call with a different resolver value should invoke the original function.
    expect(memoizedFunction(8)).to.equal(16);
    expect(callCount).to.equal(2);
  });

  it('should throw an error if not provided a function', () => {
    expect(() => memoize()).to.throw(TypeError, 'Expected a function');
    expect(() => memoize(42)).to.throw(TypeError, 'Expected a function');
    expect(() => memoize(() => {}, 'not a function')).to.throw(TypeError, 'Expected a function');
  });

  it('should expose a cache property with Map as the default', () => {
    const memoizedFunction = memoize(() => {});
    expect(memoizedFunction.cache).to.be.an.instanceOf(Map);
  });

  it('should allow replacing the memoize.Cache constructor', () => {
    const customCacheConstructor = class CustomCache {
      constructor() {
        this.cache = new Map();
      }
    };

    memoize.Cache = customCacheConstructor;

    const memoizedFunction = memoize(() => {});

    expect(memoizedFunction.cache).to.be.an.instanceOf(customCacheConstructor);
  });
});
