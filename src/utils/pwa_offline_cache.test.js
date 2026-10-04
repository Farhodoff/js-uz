import { describe, it, expect } from 'vitest';
import { pwaGlobIgnores, pwaRuntimeCaching } from '../config/pwaRuntimeCaching.js';

describe('PWA Offline Cache Configuration', () => {
  describe('pwaGlobIgnores', () => {
    it('should be a non-empty array of glob strings', () => {
      expect(Array.isArray(pwaGlobIgnores)).toBe(true);
      expect(pwaGlobIgnores.length).toBeGreaterThan(0);
      pwaGlobIgnores.forEach((glob) => {
        expect(typeof glob).toBe('string');
        expect(glob.startsWith('**/')).toBe(true);
      });
    });

    it('should include heavy modules to exclude from precache', () => {
      const joined = pwaGlobIgnores.join(' ');
      expect(joined).toContain('challenges');
      expect(joined).toContain('cynefin');
      expect(joined).toContain('cytoscape');
      expect(joined).toContain('vendor-mermaid');
      expect(joined).toContain('vendor-markdown');
      expect(joined).toContain('katex');
      expect(joined).toContain('diagram');
    });
  });

  describe('pwaRuntimeCaching', () => {
    it('should configure all expected cache strategies', () => {
      expect(Array.isArray(pwaRuntimeCaching)).toBe(true);
      const cacheNames = pwaRuntimeCaching.map((entry) => entry.options?.cacheName);
      
      expect(cacheNames).toContain('lessons-cache');
      expect(cacheNames).toContain('large-data-chunks-cache');
      expect(cacheNames).toContain('html-cache');
      expect(cacheNames).toContain('google-fonts-cache');
      expect(cacheNames).toContain('gstatic-fonts-cache');
      expect(cacheNames).toContain('images-cache');
    });

    it('should use StaleWhileRevalidate for lessons cache', () => {
      const lessonsRule = pwaRuntimeCaching.find(
        (entry) => entry.options?.cacheName === 'lessons-cache'
      );
      expect(lessonsRule).toBeDefined();
      expect(lessonsRule.handler).toBe('StaleWhileRevalidate');
      expect(lessonsRule.urlPattern.test('/assets/lessons/eventLoop-12345678.js')).toBe(true);
      expect(lessonsRule.urlPattern.test('/assets/lessons/closuresDeepDive-abcdef.js')).toBe(true);
      expect(lessonsRule.urlPattern.test('/assets/vendor-react-123.js')).toBe(false);
      expect(lessonsRule.options.cacheableResponse.statuses).toContain(200);
    });

    it('should use StaleWhileRevalidate for large data chunks', () => {
      const chunkRule = pwaRuntimeCaching.find(
        (entry) => entry.options?.cacheName === 'large-data-chunks-cache'
      );
      expect(chunkRule).toBeDefined();
      expect(chunkRule.handler).toBe('StaleWhileRevalidate');
      expect(chunkRule.urlPattern.test('/assets/challenges-C1RgQf7V.js')).toBe(true);
      expect(chunkRule.urlPattern.test('/assets/vendor-mermaid-CuvOtlEF.js')).toBe(true);
      expect(chunkRule.urlPattern.test('/assets/cynefin-OW5HDTMX.js')).toBe(true);
      expect(chunkRule.urlPattern.test('/assets/cytoscape.esm-C5JX3QLV.js')).toBe(true);
      expect(chunkRule.urlPattern.test('/assets/katex-C5jXJg4s.js')).toBe(true);
      expect(chunkRule.options.cacheableResponse.statuses).toContain(200);
    });

    it('should use NetworkFirst with timeout for navigation HTML requests', () => {
      const htmlRule = pwaRuntimeCaching.find(
        (entry) => entry.options?.cacheName === 'html-cache'
      );
      expect(htmlRule).toBeDefined();
      expect(htmlRule.handler).toBe('NetworkFirst');
      expect(htmlRule.options.networkTimeoutSeconds).toBe(2);

      const navReq = { request: { mode: 'navigate' } };
      const nonNavReq = { request: { mode: 'cors' } };
      expect(htmlRule.urlPattern(navReq)).toBe(true);
      expect(htmlRule.urlPattern(nonNavReq)).toBe(false);
      expect(htmlRule.urlPattern({})).toBeFalsy();
    });

    it('should use CacheFirst for Google Fonts', () => {
      const gfontsRule = pwaRuntimeCaching.find(
        (entry) => entry.options?.cacheName === 'google-fonts-cache'
      );
      const gstaticRule = pwaRuntimeCaching.find(
        (entry) => entry.options?.cacheName === 'gstatic-fonts-cache'
      );

      expect(gfontsRule.handler).toBe('CacheFirst');
      expect(gstaticRule.handler).toBe('CacheFirst');

      expect(gfontsRule.urlPattern.test('https://fonts.googleapis.com/css2?family=Inter')).toBe(true);
      expect(gstaticRule.urlPattern.test('https://fonts.gstatic.com/s/inter/v13/xyz.woff2')).toBe(true);
    });

    it('should use StaleWhileRevalidate for static image assets', () => {
      const imgRule = pwaRuntimeCaching.find(
        (entry) => entry.options?.cacheName === 'images-cache'
      );
      expect(imgRule).toBeDefined();
      expect(imgRule.handler).toBe('StaleWhileRevalidate');

      expect(imgRule.urlPattern.test('favicon.svg')).toBe(true);
      expect(imgRule.urlPattern.test('logo.png')).toBe(true);
      expect(imgRule.urlPattern.test('photo.webp')).toBe(true);
      expect(imgRule.urlPattern.test('avatar.jpg')).toBe(true);
      expect(imgRule.urlPattern.test('bundle.js')).toBe(false);
    });
  });
});
