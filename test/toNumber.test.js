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

    it('should return NaN for invalid binary and octal strings', () => {
        expect(toNumber('0b12')).to.be.NaN;
        expect(toNumber('0o89')).to.be.NaN;
    });

    it('should convert valid hexadecimal string to a number', () => {
        expect(toNumber('0xA')).to.equal(10);
        //expect(toNumber('-A')).to.equal(-10);
    });

    it('should handle bad hexadecimal string and return NaN', () => {
        expect(toNumber('-0xABC')).to.be.NaN;
        expect(toNumber('+0x123')).to.be.NaN;
    });

    it('should handle extra whitespace in a string', () => {
        expect(toNumber('  2 ')).to.equal(2);
    });

    it('should handle string with only whitespaces and return NaN', () => {
        expect(toNumber('   ')).to.equal(0);
    });

    it('should handle non-numeric string', () => {
        expect(toNumber('abc')).to.be.NaN;
    });

    it('should return NaN when given object', () => {
        expect(toNumber({})).to.be.NaN;
    });

    it('should return NaN when given Symbol', () => {
        expect(toNumber(Symbol('testSymbol'))).to.be.NaN;
    });

    it('should handle non-string and non-zero non-string values', () => {
        expect(toNumber(true)).to.equal(1);
        expect(toNumber(false)).to.equal(0);
        expect(toNumber(null)).to.equal(0);
        expect(toNumber(undefined)).to.be.NaN;
    });

    it('should extract numeric value from an object using valueOf', () => {
        const obj = {
            valueOf: () => 42,
        };
        expect(toNumber(obj)).to.equal(42);
    });
    
    it('should return NaN when valueOf is not a function in the object', () => {
        const obj = {
            valueOf: 42,
        };
        expect(toNumber(obj)).to.be.NaN;
    });
});