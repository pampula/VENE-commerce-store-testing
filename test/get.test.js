import chai from 'chai';
import get from '../src/get.js';

const expect = chai.expect;

describe('get', () => {
    it('should get value at a valid path', () => {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a[0].b.c')).to.equal(3);
        expect(get(object, ['a', '0', 'b', 'c'])).to.equal(3);
    });

    it('should return default value for undefined resolved values', () => {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, 'a.b.c', 'default')).to.equal('default');
        expect(get(undefined, 'a.b.c', 'default')).to.equal('default');
        expect(get(null, 'a.b.c', 'default')).to.equal('default');
    });

    it('should handle an empty path', () => {
        const object = { 'a': [{ 'b': { 'c': 3 } }] };
        expect(get(object, '')).to.equal(undefined);
        });
        
    it('should handle an empty object', () => {
        const object = {};
        expect(get(object, 'a.b.c', 'default')).to.equal('default');
    });
        
    it('should return default value for nested undefined resolved values', () => {
        const object = { 'a': [{ 'b': { 'c': undefined } }] };
        expect(get(object, 'a[0].b.c', 'default')).to.equal('default');
    });
        
    it('should return default value for out-of-bounds array index', () => {
        const object = { 'a': [] };
        expect(get(object, 'a[10].b.c', 'default')).to.equal('default');
    });
        
    it('should return default value for non-existent property', () => {
        const object = { 'a': { 'b': 42 } };
        expect(get(object, 'a.x.y.z', 'default')).to.equal('default');
    });
});
