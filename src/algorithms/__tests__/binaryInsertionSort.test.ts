import binaryInsertionSort from '../binaryInsertionSort';

const sortIncreasing = (a: number, b: number) => a - b;

describe('binaryInsertionSort', () => {
	it('sorts array', () => {
		expect(binaryInsertionSort([2, 1, 69, 3, 7], sortIncreasing)).toEqual([1, 2, 3, 7, 69]);
	});
});
