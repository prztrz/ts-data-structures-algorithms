/**
 * https://www.geeksforgeeks.org/binary-search/
 */

type SearchCb<T> = (item: T) => number;

export default function binarySearch<T>(arr: T[], cb: SearchCb<T>, leftEdge = 0, rightEdge = arr.length - 1) {
	if (leftEdge > rightEdge) {
		return;
	}

	const midIndex = Math.floor((leftEdge + rightEdge) / 2);
	const midItem = arr[midIndex];

	const searchResult = cb(midItem);
	if (searchResult === 0) {
		return midItem;
	}

	if (searchResult < 0) {
		return binarySearch(arr, cb, midIndex + 1, rightEdge);
	}

	return binarySearch(arr, cb, leftEdge, midIndex - 1);
}
