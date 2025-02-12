import LinkedList from '../LlinkedList';

describe('LinkedList', () => {
	describe('constructor', () => {
		it('creates an empty list', () => {
			const list = new LinkedList();
			expect(list.length).toBe(0);
			expect(list).toEqual({ head: undefined, tail: undefined });
		});

		it('creates a list with single item', () => {
			const list = new LinkedList(0);
			expect(list.length).toBe(1);
			expect(list).toEqual({ head: 0, tail: undefined });
		});

		it('creates a list with multiple items', () => {
			const list = new LinkedList(0, 1, 2);

			expect(list.length).toBe(3);
			expect(list).toEqual({ head: 0, tail: { head: 1, tail: { head: 2, tail: undefined } } });
		});
	});

	describe('map', () => {
		it('maps items', () => {
			expect(new LinkedList().map(String)).toEqual({ head: undefined, tail: undefined });
			expect(new LinkedList(1, 2, 3).map(String)).toEqual({
				head: '1',
				tail: {
					head: '2',
					tail: {
						head: '3',
						tail: undefined,
					},
				},
			});
		});
	});

	describe('push', () => {
		it('does not pushes items if no item specified', () => {
			const list = new LinkedList();
			list.push();
			expect(list).toEqual({ head: undefined, tails: undefined });
		});

		it('pushes items at the end of the list', () => {
			const list = new LinkedList();
			list.push(1);
			expect(list).toEqual({ head: 1, tail: undefined });

			list.push(2, 3);
			expect(list).toEqual({ head: 1, tail: { head: 2, tail: { head: 3, tail: undefined } } });
		});
	});

	describe('shift', () => {
		it('returns undefined for empty lists', () => {
			const list = new LinkedList();
			expect(list.shift()).toBeUndefined();
			expect(list.length).toBe(0);
		});

		it('returns first element of the list', () => {
			const list = new LinkedList(0, 1, 2);

			expect(list.shift()).toBe(0);
			expect(list.shift()).toBe(1);
			expect(list.shift()).toBe(2);
		});

		it('removes first element from the list', () => {
			const list = new LinkedList(0, 1, 2);

			list.shift();
			expect(list.length).toBe(2);
			expect(list).toEqual({ head: 1, tail: { head: 2, tail: undefined } });

			list.shift();
			expect(list.length).toBe(1);
			expect(list).toEqual({ head: 2, tail: undefined });

			list.shift();
			expect(list.length).toBe(0);
			expect(list).toEqual({ head: undefined, tail: undefined });
		});
	});

	describe('forEach', () => {
		it('does not call callback if list is empty', () => {
			const mock = vi.fn();
			const list = new LinkedList();
			list.forEach(mock);

			expect(mock).toHaveBeenCalledTimes(0);
		});

		it('calls callback once for every item', () => {
			const mock = vi.fn();
			const list = new LinkedList(0, 1, 2, 3);
			list.forEach(mock);

			expect(mock).toHaveBeenCalledTimes(4);
			expect(mock).toHaveBeenNthCalledWith(1, 0, list);
			expect(mock).toHaveBeenNthCalledWith(2, 1, list);
			expect(mock).toHaveBeenNthCalledWith(3, 2, list);
			expect(mock).toHaveBeenNthCalledWith(4, 3, list);
		});
	});

	describe('toArray', () => {
		it('transform list into array', () => {
			expect(new LinkedList().toArray()).toEqual([]);

			expect(new LinkedList(1, 2, 3).toArray()).toEqual([1, 2, 3]);
		});
	});
});
