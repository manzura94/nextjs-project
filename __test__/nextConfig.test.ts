import { describe, it, expect } from 'vitest';
import nextConfig from '../next.config.mjs';

describe('Next.js Configuration', () => {
    it('should export an object', () => {
        expect(typeof nextConfig).toBe('object');
    });

    it('should contain specific properties', () => {
        expect(nextConfig).toHaveProperty('reactStrictMode');
        expect(nextConfig).toHaveProperty('webpack');
        expect(nextConfig).toHaveProperty('env');
    });

    it('reactStrictMode should be true', () => {
        expect(nextConfig.reactStrictMode).toBe(true);
    });
});
