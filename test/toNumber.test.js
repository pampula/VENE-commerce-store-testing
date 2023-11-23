import chai from 'chai';
import toNumber from '../src/toNumber.js';

const expect = chai.expect;

describe('toNumber', () => {
    it('should convert integer to number', () => {
        expect(toNumber(2)).to.equal(2);
        expect(toNumber(-2)).to.equal(-2);
    });

    it('should convert float to number', () => {
        expect(toNumber(2.2)).to.equal(2.2);
        expect(toNumber(-2.2)).to.equal(-2.2);
    });

    it('should convert infinity', () => {
        expect(toNumber(Infinity)).to.equal(Infinity);
    });

    it('should convert Number.MIN_VALUE', () => {
        expect(toNumber(Number.MIN_VALUE)).to.equal(5e-324);
    });

    it('should convert valid numeric string', () => {
        expect(toNumber('2')).to.equal(2);
        expect(toNumber('-2')).to.equal(-2);
    });

    it('should convert binary string', () => {
        expect(toNumber('0b1010')).to.equal(10);
    });

    it('should convert octal string', () => {
        expect(toNumber('0o777')).to.equal(511);
    });

    it('should handle extra whitespace in a string', () => {
        expect(toNumber('  2 ')).to.equal(2);
    });

    it('should handle non-numeric string', () => {
        expect(toNumber('abc')).to.be.NaN;
    });

    it('should handle objects', () => {
        expect(toNumber({})).to.be.NaN;
    });
});