import Queue from '../Queue';

describe('Queue', () => {
	it('returns element in first-in-first-out order', () => {
		const queue = new Queue<string>();

		queue.enqueue('Jordan');
		queue.enqueue('Barbara');
		queue.enqueue('Jacob');
		queue.enqueue('Elfride');

		expect(queue.dequeue()).toBe('Jordan');
		expect(queue.dequeue()).toBe('Barbara');
		expect(queue.dequeue()).toBe('Jacob');
		expect(queue.dequeue()).toBe('Elfride');
	});

	it('peeks enqueued element without removing it', () => {
		const queue = new Queue<string>();

		queue.enqueue('Jordan');
		queue.enqueue('Barbara');
		queue.enqueue('Jacob');
		queue.enqueue('Elfride');

		expect(queue.peek()).toBe('Jordan');
		expect(queue.dequeue()).toBe('Jordan');
		expect(queue.peek()).toBe('Barbara');
		expect(queue.dequeue()).toBe('Barbara');
	});
});
