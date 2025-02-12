/**
 * https://www.geeksforgeeks.org/stack-data-structure/
 */

import LinkedList from './LinkedList';

export default class Stack<T> {
	#list: LinkedList<T>;

	constructor() {
		this.#list = new LinkedList();
	}

	add(item: T) {
		this.#list.unshift(item);
	}

	next() {
		return this.#list.shift();
	}

	peek() {
		return this.#list.head;
	}
}
