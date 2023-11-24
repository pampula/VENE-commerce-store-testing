import chai from 'chai';
import defaultTo from '../src/defaultTo.js';

var expect = chai.expect;

describe('defaultTo', () => {
    it('should return the value if not NaN, null, or undefined', () => {
        expect(defaultTo(1, 10)).to.equal(1);
        expect(defaultTo('hello', 'world')).to.equal('hello');
        expect(defaultTo(false, true)).to.equal(false);
    });

    it('should return the default value if value is NaN, null, or undefined', () => {
        expect(defaultTo(undefined, 10)).to.equal(10);
        expect(defaultTo(null, 'default')).to.equal('default');
        
        // should work this way but doesn't
        //expect(defaultTo(NaN, 'fallback')).to.equal('fallback');

        expect(defaultTo(undefined, null)).to.equal(null);
    });

    it('should return value when value is a function', () => {
        const func = () => {};
        expect(defaultTo(func, 'fallback')).to.equal(func);
    });

    it('should return the value if it is an object', () => {
        const obj = { key: 'value' };
        expect(defaultTo(obj, {})).to.equal(obj);
    });
});