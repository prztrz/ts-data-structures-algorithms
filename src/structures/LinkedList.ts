/**
 * https://www.geeksforgeeks.org/linked-list-data-structure/
 */

export class Link<T> {
	head: T;
	tail: Link<T> | undefined;

	constructor(item: T, tail?: Link<T>) {
		this.head = item;
		this.tail = tail;
	}

	link(link: T) {
		this.tail = new Link(link);
		return this.tail;
	}
}

class LinkedListIterator<T> implements Iterator<T> {
	#link: Link<T | undefined>;
	constructor(link: Link<T | undefined>) {
		this.#link = link;
	}

	next() {
		if (this.#link.head === undefined) {
			return { done: true, value: undefined } as const;
		}

		const value = this.#link.head;
		this.#link.head = this.#link.tail?.head;
		this.#link.tail = this.#link?.tail?.tail;
		return { done: false, value } as const;
	}
}

export default class LinkedList<T> {
	head: T | undefined;
	tail: Link<T | undefined> | undefined;
	#last!: Link<T | undefined>;
	#length!: number;

	get length() {
		return this.#length;
	}

	[Symbol.iterator]() {
		return new LinkedListIterator<T>(this.#toLink());
	}

	constructor(...items: T[]) {
		this.#clear();
		this.push(...items);
	}

	#clear() {
		this.#length = 0;
		const emptyLink = new Link<T | undefined>(undefined);
		this.head = emptyLink.head;
		this.tail = emptyLink.tail;
		this.#last = emptyLink;
	}

	#toLink() {
		return new Link(this.head, this.tail);
	}

	forEach(cb: (item: T, list: LinkedList<T>) => void) {
		for (const item of this) {
			cb(item, this);
		}
	}

	map<R>(cb: (item: T, list: LinkedList<T>) => R) {
		const arr = this.toArray();
		const map = arr.map((item) => cb(item, this));

		return new LinkedList<R>(...map);
	}

	push(...items: T[]) {
		if (!items.length) {
			return;
		}

		items.forEach((item) => {
			this.#length++;

			if (this.head === undefined) {
				const link = new Link(item);
				this.head = link.head;
				this.tail = link.tail;
				this.#last = link;
				return;
			}

			const next = this.#last.link(item);

			if (this.tail === undefined) {
				this.tail = next;
			}

			this.#last = next;
		});
	}

	shift() {
		const item = this.head;
		this.head = this.tail?.head;
		this.tail = this.tail?.tail;

		if (item !== undefined) {
			this.#length--;
		}

		return item;
	}

	toArray() {
		return [...this];
	}

	unshift(...items: T[]) {
		if (items.length === 0) {
			return;
		}

		const arrified = this.toArray();
		this.#clear();
		this.push(...items, ...arrified);
	}
}
