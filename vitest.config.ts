/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		testTimeout: 30_000,
		dir: 'src',
		include: ['**/__tests__/**']
	},
});
