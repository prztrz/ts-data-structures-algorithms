import binarySearch from '../binarySearch';

const searchForTwenty = (item: number) => item - 20;
const searchForSix = (item: number) => item - 6;
const searchForEleven = (item: number) => item - 1;

describe('binarySearch', () => {
	it('finds element if it exists in array', () => {
		expect(binarySearch([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], searchForTwenty)).toBe(20);
		expect(binarySearch([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], searchForSix)).toBe(6);
	});

	it('return undefined if element is not found', () => {
		expect(binarySearch([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], searchForEleven)).toBeUndefined();
	});
});
