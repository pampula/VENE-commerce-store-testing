import chai from 'chai';
import isEmpty from '../src/isEmpty.js';

const expect = chai.expect;

describe('isEmpty', () => {
    it('should return true for null and undefined', () => {
        expect(isEmpty(null)).to.equal(true);
        expect(isEmpty(undefined)).to.equal(true);
    });

    it('should return true for true, false, and numbers', () => {
        expect(isEmpty(true)).to.equal(true);
        expect(isEmpty(false)).to.equal(true);
        expect(isEmpty(1)).to.equal(true);
    });

    it('should return false for non-empty arrays and strings', () => {
        expect(isEmpty([1, 2, 3])).to.equal(false);
        expect(isEmpty('abc')).to.equal(false);
    });

    it('should return false for non-empty objects', () => {
        expect(isEmpty({ 'a': 1 })).to.equal(false);
    });

    it('should return false for non-empty maps and sets', () => {
        const nonEmptyMap = new Map([['key', 'value']]);
        const nonEmptySet = new Set([1, 2, 3]);
        
        expect(isEmpty(nonEmptyMap)).to.equal(false);
        expect(isEmpty(nonEmptySet)).to.equal(false);
        });

    it('should return true for empty arrays and array-like objects', () => {
        expect(isEmpty([])).to.equal(true);
    });

    it('should return true for empty strings', () => {
        expect(isEmpty('')).to.equal(true);
    });

    it('should return true for empty array-like objects', () => {
        expect(isEmpty({})).to.equal(true);
    });

    it('should return true for empty maps and sets', () => {
        expect(isEmpty(new Map())).to.equal(true);
        expect(isEmpty(new Set())).to.equal(true);
    });

    it('should return true for empty objects with prototype properties', () => {
        const emptyObjectWithPrototype = Object.create({ prototypeProperty: 'value' });
        expect(isEmpty(emptyObjectWithPrototype)).to.equal(true);
    });

    it('should return true for objects with prototype properties but no own properties', () => {
        const objWithPrototype = Object.create({ prototypeProperty: 'value' });
        expect(isEmpty(objWithPrototype)).to.equal(true);
    });

    it('should return false for objects with both prototype and own properties', () => {
        const objWithProperties = { ownProperty: 'value' };
        objWithProperties.__proto__ = { prototypeProperty: 'value' };
        expect(isEmpty(objWithProperties)).to.equal(false);
    });
});
