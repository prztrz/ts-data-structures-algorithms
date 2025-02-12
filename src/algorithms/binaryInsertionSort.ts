/**
 * https://www.geeksforgeeks.org/binary-insertion-sort/
 */

type SortCb<T> = (midItem: T, currentItem: T) => number;

export default function binaryInsertionSort<T>(arr: T[], cb: SortCb<T>, index = 1) {
	const item = arr[index];
	if (item === undefined) {
		return arr;
	}
	const sortedIndex = findBinaryIndex(arr, cb, 0, index - 1, item);
	const arrayWithoutItem = [...arr.slice(0, index), ...arr.slice(index + 1)];
	const sortedArray = [...arrayWithoutItem.slice(0, sortedIndex), item, ...arrayWithoutItem.slice(sortedIndex)];

	return binaryInsertionSort(sortedArray, cb, index + 1);
}

function findBinaryIndex<T>(arr: T[], cb: SortCb<T>, leftEdge = 0, rightEdge: number, currentItem: T) {
	if (leftEdge > rightEdge) {
		return leftEdge;
	}

	const midIndex = Math.floor((leftEdge + rightEdge) / 2);
	const midItem = arr[midIndex];

	const sortResult = cb(midItem, currentItem);
	if (sortResult < 0) {
		return findBinaryIndex(arr, cb, midIndex + 1, rightEdge, currentItem);
	}

	return findBinaryIndex(arr, cb, leftEdge, midIndex - 1, currentItem);
}
