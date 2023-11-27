import chai from 'chai';
import add from '../src/add.js';

var expect = chai.expect;

describe('add', () => {
    it('should add two positive numbers', () => {
        expect(add(6, 4)).to.equal(10);
        expect(add(2, 2)).to.equal(4);
    });

    it('should handle negative numbers correctly', () => {
        expect(add(-6, 4)).to.equal(-2);
        expect(add(6, -4)).to.equal(2);
        expect(add(-2, -2)).to.equal(-4);
    });

    it('should handle zero values correctly', () => {
        expect(add(0, 0)).to.equal(0);
        expect(add(2, 0)).to.equal(2);
    });

    it('should add decimal numbers', () => {
        expect(add(1.5, 2.5)).to.equal(4);
        expect(add(0.1, 0.2)).to.be.closeTo(0.3, 10);
    });

    it('should add large numbers', () => {
        expect(add(1e20, 1e20)).to.equal(2e20);
    });

    it('should handle missing arguments', () => {
        expect(add(5)).to.equal(5);
        expect(add()).to.equal(0);
    });
});
