import Stack from '../Stack';

describe('Stack', () => {
	it('returns elements in last-in-first-out order', () => {
		const stack = new Stack<string>();
		stack.add('Jordan');
		stack.add('Barbara');
		stack.add('Jacob');
		stack.add('Elfride');

		expect(stack.next()).toBe('Elfride');
		expect(stack.next()).toBe('Jacob');
		expect(stack.next()).toBe('Barbara');
		expect(stack.next()).toBe('Jordan');
		expect(stack.next()).toBeUndefined();
	});

	it('peeks next element without removing it', () => {
		const stack = new Stack<string>();
		stack.add('Jordan');
		stack.add('Barbara');
		stack.add('Jacob');
		stack.add('Elfride');

		expect(stack.peek()).toBe('Elfride');
		expect(stack.next()).toBe('Elfride');
		expect(stack.peek()).toBe('Jacob');
		expect(stack.next()).toBe('Jacob');
	});
});
