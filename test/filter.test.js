import chai from 'chai';
import filter from '../src/filter.js';

const expect = chai.expect;

describe('filter', () => {
    it('should filter elements based on the provided predicate', () => {
        const users = [
            {'user': 'User1', 'active': true},
            {'user': 'User2', 'active': false}
        ];

        expect(filter(users, ( {active} ) => active)).to.deep.equal([{'user': 'User1', 'active': true}]);
    });

    it('should handle an empty array', () => {
        expect(filter([], () => true)).to.deep.equal([[]]);
    });

    it('should handle an array with no matching elements', () => {
        const users = [
            {'user': 'User1', 'active': false},
            {'user': 'User2', 'active': false}
        ];

        expect(filter(users, ( {active} ) => active)).to.deep.equal([[]]);
    });

    it('should filter based on index', () => {
        const array = [1, 2, 3, 4, 5];
        
        expect(filter(array, (_, index) => index % 2 === 0)).to.deep.equal([1, 3, 5]);
    });

    it('should filter based on value', () => {
        const array = [-1, 2, 3, 4, 5];

        expect(filter(array, value => value > 3)).to.deep.equal([4, 5]);
    });

    it('should handle falsy values in the array', () => {
        const array = [0, false, '', null, undefined, NaN, 44];

        expect(filter(array, value => value)).to.deep.equal([44]);
    });

    it('should handle complex objects and nested properties', () => {
        const items = [
            { person: { name: 'John', age: 25 } },
            { person: { name: 'Jane', age: 30 } },
            { person: { name: 'Doe', age: 20 } }
          ];
      
          expect(filter(items, ({ person }) => person.age > 25)).to.deep.equal([{ person: { name: 'Jane', age: 30 } }]);
    });

    it('should handle duplicate elements in an array', () => {
        const array = [1, 2, 3, 2, 4, 5, 3];

        expect(filter(array, (value, index, arr) => arr.indexOf(value) === index)).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should handle undefined array', () => {
        expect(filter(null, () => true)).to.deep.equal([[]]);
    });

    it('should not modify the original array', () => {
        const array = [1, 2, 3];
        const result = filter(array, () => true);

        expect(result).to.deep.equal([1, 2, 3]);
        expect(result).to.not.equal(array);
    });

    it('should handle an array of objects with missing properties', () => {
        const objects = [
          { name: 'Alice', age: 25 },
          { name: 'Bob' },
          { name: 'Charlie', age: 30 }
        ];
    
        const result = filter(objects, obj => obj.age);
    
        expect(result).to.deep.equal([{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]);
      });
});