import Queue from './Queue';

export class Node<T> {
	left?: Node<T>;
	right?: Node<T>;
	current: T | null;

	constructor(item?: T | Node<T>, left?: Node<T>, right?: Node<T>) {
		if (item instanceof Node) {
			this.current = item.current;
			this.left = item.left;
			this.right = item.right;
			return;
		}

		this.current = item ?? null;
		this.left = left;
		this.right = right;
	}
}

export default class BinaryTree<T> extends Node<T> {
	static parse<T>(serialized: T[]): BinaryTree<T> {
		const initialNode: Node<T> = new Node();

		const queue = new Queue<Node<T | null>>();
		queue.enqueue(initialNode);

		for (const item of serialized) {
			const node = queue.dequeue();
			if (!node) {
				throw new Error('Unexpected error on parsing array to Binary Tree');
			}
			node.current = item;
			node.left = new Node();
			node.right = new Node();

			queue.enqueue(node.left);
			queue.enqueue(node.right);
		}

		return new BinaryTree(initialNode);
	}

	constructor(input: T[] | Node<T> = []) {
		if (Array.isArray(input)) {
			super(BinaryTree.parse(input));
		} else {
			super(input);
		}
	}

	inOrderTraverse<R>(visit: (item: T) => R) {
		if (this.current === null) {
			return;
		}

		new BinaryTree(this.left).inOrderTraverse(visit);
		visit(this.current);
		new BinaryTree(this.right).inOrderTraverse(visit);
	}

	levelOrderTraverse<R>(visit: (item: T) => R) {
		const queue = new Queue<Node<T>>();
		queue.enqueue(this);
		while (queue.peek() !== undefined) {
			const { current, left, right } = queue.dequeue() as Node<T>;
			if (left?.current !== null && left?.current !== undefined) {
				queue.enqueue(left);
			}

			if (right?.current !== null && right?.current !== undefined) {
				queue.enqueue(right);
			}

			if (current !== null) {
				visit(current);
			}
		}
	}

	postOrderTraverse<R>(visit: (item: T) => R) {
		if (this.current === null) {
			return;
		}

		new BinaryTree(this.left).postOrderTraverse(visit);
		new BinaryTree(this.right).postOrderTraverse(visit);
		visit(this.current);
	}

	preOrderTraverse<R>(visit: (item: T) => R) {
		if (this.current === null) {
			return;
		}

		visit(this.current);
		new BinaryTree(this.left).preOrderTraverse(visit);
		new BinaryTree(this.right).preOrderTraverse(visit);
	}

	toArray() {
		const result: T[] = [];
		this.levelOrderTraverse((item) => result.push(item));
		return result;
	}
}
