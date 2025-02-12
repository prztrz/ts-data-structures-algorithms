/**
 * https://www.geeksforgeeks.org/queue-data-structure/
 */

import LinkedList from './LinkedList';

export default class Queue<T> {
	#list: LinkedList<T>;

	constructor() {
		this.#list = new LinkedList<T>();
	}

	enqueue(item: T) {
		this.#list.push(item);
	}

	dequeue() {
		return this.#list.shift();
	}

	peek() {
		return this.#list.head;
	}
}
