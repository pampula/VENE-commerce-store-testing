import chai from 'chai';
import get from '../src/get.js';

const expect = chai.expect;

describe('get', () => {
    it('should get value at a valid path', () => {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };

        // Test with dot notation
        expect(get(object, 'a[0].b.c')).to.equal(3);

        // Test with array notation
        expect(get(object, ['a', '0', 'b', 'c'])).to.equal(3);
    });

    it('should return default value for undefined resolved values', () => {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };

        // Test with invalid path
        expect(get(object, 'a.b.c', 'default')).to.equal('default');

        // Test with undefined object
        expect(get(undefined, 'a.b.c', 'default')).to.equal('default');

        // Test with null object
        expect(get(null, 'a.b.c', 'default')).to.equal('default');
    });
});
