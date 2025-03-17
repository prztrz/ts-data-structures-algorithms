import BinaryTree, { Node } from '../BinaryTree';

describe('Binary tree', () => {
	it('creates empty tree', () => {
		expect(new BinaryTree().current).toBeNull();
		expect(new BinaryTree().left).toBeUndefined();
		expect(new BinaryTree().right).toBeUndefined();
	});

	it('Creates tree from node', () => {
		const node = new Node(2, { current: 1, left: { current: 7 } }, { current: 3 });
		const tree = new BinaryTree<number>(node);

		expect(tree).toBeInstanceOf(BinaryTree);
		expect(tree.current).toBe(2);
		expect(tree.left?.current).toBe(1);
		expect(tree.left?.left?.current).toBe(7);
		expect(tree.right?.current).toBe(3);
	});

	it('Creates tree from array', () => {
		const tree = new BinaryTree([2, 1, 3, 7]);
		expect(tree).toBeInstanceOf(BinaryTree);
		expect(tree.current).toBe(2);
		expect(tree.left?.current).toBe(1);
		expect(tree.left?.left?.current).toBe(7);
		expect(tree.right?.current).toBe(3);
	});

	it('Parses array', () => {
		const tree = BinaryTree.parse([2, 1, 3, 7]);
		expect(tree).toBeInstanceOf(BinaryTree);
		expect(tree.current).toBe(2);
		expect(tree.left?.current).toBe(1);
		expect(tree.left?.left?.current).toBe(7);
		expect(tree.right?.current).toBe(3);
	});

	it('traverses tree in order fashion', () => {
		const mockVisit = vi.fn();
		const tree = new BinaryTree([2, 1, 3, 7, 5]);
		tree.inOrderTraverse(mockVisit);
		expect(mockVisit).toHaveBeenCalledTimes(5);
		expect(mockVisit).toHaveBeenNthCalledWith(1, 7);
		expect(mockVisit).toHaveBeenNthCalledWith(2, 1);
		expect(mockVisit).toHaveBeenNthCalledWith(3, 5);
		expect(mockVisit).toHaveBeenNthCalledWith(4, 2);
		expect(mockVisit).toHaveBeenNthCalledWith(5, 3);
	});

	it('traverses tree in level order', () => {
		const mockVisit = vi.fn();
		const tree = new BinaryTree([2, 1, 3, 7]);

		tree.levelOrderTraverse(mockVisit);
		expect(mockVisit).toHaveBeenCalledTimes(4);
		expect(mockVisit).toHaveBeenNthCalledWith(1, 2);
		expect(mockVisit).toHaveBeenNthCalledWith(2, 1);
		expect(mockVisit).toHaveBeenNthCalledWith(3, 3);
		expect(mockVisit).toHaveBeenNthCalledWith(4, 7);
	});

	it('serializes to Array', () => {
		const tree = new BinaryTree([2, 1, 3, 7]);
		expect(tree.toArray()).toEqual([2, 1, 3, 7]);
	});

	it('traverses tree post order fashion', () => {
		const mockVisit = vi.fn();
		const tree = new BinaryTree([2, 1, 3, 7, 5]);
		tree.postOrderTraverse(mockVisit);
		expect(mockVisit).toHaveBeenCalledTimes(5);
		expect(mockVisit).toHaveBeenNthCalledWith(1, 7);
		expect(mockVisit).toHaveBeenNthCalledWith(2, 5);
		expect(mockVisit).toHaveBeenNthCalledWith(3, 1);
		expect(mockVisit).toHaveBeenNthCalledWith(4, 3);
		expect(mockVisit).toHaveBeenNthCalledWith(5, 2);
	});

	it('traverses tree pre order fashion', () => {
		const mockVisit = vi.fn();
		const tree = new BinaryTree([2, 1, 3, 7, 5]);
		tree.preOrderTraverse(mockVisit);
		expect(mockVisit).toHaveBeenCalledTimes(5);
		expect(mockVisit).toHaveBeenNthCalledWith(1, 2);
		expect(mockVisit).toHaveBeenNthCalledWith(2, 1);
		expect(mockVisit).toHaveBeenNthCalledWith(3, 7);
		expect(mockVisit).toHaveBeenNthCalledWith(4, 5);
		expect(mockVisit).toHaveBeenNthCalledWith(5, 3);
	});
});
