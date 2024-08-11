import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        include: ['**/tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        exclude: ['**/*.d.ts', '**/node_modules/**', '**/test-utils/**'],
        coverage: {
            exclude: [
                'build/**/*.js', 
                'node_modules/**', 
                '**/*.d.ts', 
                '.eslintrc.cjs',
                'eslint.config.js',
                'vite.config.ts',
                'vitest.config.ts',
            ],
        },
        testTimeout: 15000,
    },
});
