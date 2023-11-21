import chai from 'chai';
import add from '../src/add.js';
var expect = chai.expect;

describe('add', () => {
    it('should add two numbers', () => {
        expect(add(6, 4)).to.equal(10);
        expect(add(-6, 4)).to.equal(-2);
        expect(add(6, -4)).to.equal(2);
    });
});
