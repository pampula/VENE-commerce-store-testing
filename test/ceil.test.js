import chai from 'chai';
import ceil from '../src/ceil.js';

var expect = chai.expect;

describe('ceil', () => {
    it('should round up positive numbers to the nearest integer', () => {
        expect(ceil(4.006)).to.equal(5);
        expect(ceil(6.004, 2)).to.equal(6.01);
        expect(ceil(6040, -2)).to.equal(6100);
    });

    it('should round up negative numbers to the nearest integer', () => {
        expect(ceil(-4.006)).to.equal(-4);
        expect(ceil(-6.004, 2)).to.equal(-6);
        expect(ceil(-6040, -2)).to.equal(-6000);
    });

    it('should handle precision of 0', () => {
        expect(ceil(4.006, 0)).to.equal(5);
        expect(ceil(-4.004, 0)).to.equal(-4);
    });

    it('should handle infinity', () => {
        expect(ceil(Infinity)).to.equal(Infinity);
        expect(ceil(-Infinity)).to.equal(-Infinity);
    });

    it('should return NaN for invalid inputs', () => {
        expect(isNaN(ceil('invalid'))).to.equal(true);
        expect(isNaN(ceil(undefined))).to.equal(true);
        expect(isNaN(ceil(NaN))).to.equal(true);
    });

    it('should return 0 for null input', () => {
        expect(ceil(null)).to.equal(0);
    });
});