/**
 * https://www.geeksforgeeks.org/quick-sort-algorithm/
 */
type SortCb<T> = (item: T, pivot: T) => number;

export default function quickSort<T>(arr: T[], cb: SortCb<T>, leftEdge = 0, rightEdge = arr.length - 1) {
	if (leftEdge >= rightEdge) {
		return arr;
	}

	const pivotIndex = partition(arr, cb, leftEdge, rightEdge);

	quickSort(arr, cb, leftEdge, pivotIndex - 1);
	quickSort(arr, cb, pivotIndex + 1, rightEdge);
	return arr;
}

function partition<T>(arr: T[], cb: SortCb<T>, leftEdge = 0, rightEdge = arr.length - 1) {
	const pivot = arr[rightEdge];

	let pivotLeftItemIndex = leftEdge - 1;

	for (let currentIndex = leftEdge; currentIndex <= rightEdge; currentIndex++) {
		if (cb(arr[currentIndex], pivot) < 0) {
			pivotLeftItemIndex++;

			swap(arr, pivotLeftItemIndex, currentIndex);
		}
	}

	const pivotIndex = pivotLeftItemIndex + 1;
	swap(arr, pivotIndex, rightEdge);
	return pivotIndex;
}

function swap(arr: unknown[], leftIndex: number, rightIndex: number) {
	const tmp = arr[leftIndex];
	arr[leftIndex] = arr[rightIndex];
	arr[rightIndex] = tmp;
}
