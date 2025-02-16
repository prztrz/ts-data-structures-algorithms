/**
 * https://www.geeksforgeeks.org/merge-sort/
 */

type SortCb<T> = (leftItem: T, rightItem: T) => number;
export default function mergeSort<T>(arr: T[], cb: SortCb<T>, leftEdge = 0, rightEdge = arr.length - 1): T[] {
	if (leftEdge >= rightEdge) {
		return arr;
	}

	const midIndex = Math.floor((leftEdge + rightEdge) / 2);

	const sortedLeft = mergeSort(arr, cb, leftEdge, midIndex);
	const sortedRight = mergeSort(sortedLeft, cb, midIndex + 1, rightEdge);
	return merge(sortedRight, cb, leftEdge, midIndex, rightEdge);
}

function merge<T>(arr: T[], cb: SortCb<T>, leftEdge: number, mid: number, rightEdge: number) {
	const leftArray = arr.slice(leftEdge, mid + 1);
	const rightArray = arr.slice(mid + 1, rightEdge + 1);
	const sorted = sort(cb, leftArray, rightArray);

	return [...arr.slice(0, leftEdge), ...sorted, ...arr.slice(rightEdge + 1)];
}

function sort<T>(cb: SortCb<T>, leftArray: T[], rightArray: T[], result: T[] = []) {
	if (leftArray.length === 0 || rightArray.length === 0) {
		return [...result, ...leftArray, ...rightArray];
	}

	const pickedArrayIndex = cb(leftArray[0], rightArray[0]) <= 0 ? 0 : 1;
	const nextItem = [leftArray, rightArray][pickedArrayIndex].shift() as T;
	const nextResult = [...result, nextItem];

	return sort(cb, leftArray, rightArray, nextResult);
}
