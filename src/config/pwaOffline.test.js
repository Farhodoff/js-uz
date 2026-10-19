import { describe, it, expect, vi } from 'vitest';
import {
  APP_SHELL_PAGE,
  OFFLINE_PAGE,
  createOfflineFallbackResolver,
  isNavigationRequest,
} from './pwaOffline.js';

describe('isNavigationRequest', () => {
  it('faqat navigate rejimidagi so\'rovni aniqlaydi', () => {
    expect(isNavigationRequest({ mode: 'navigate' })).toBe(true);
    expect(isNavigationRequest({ mode: 'cors' })).toBe(false);
    expect(isNavigationRequest(null)).toBe(false);
    expect(isNavigationRequest(undefined)).toBe(false);
  });
});

describe('createOfflineFallbackResolver', () => {
  it('avval app shell (index.html) ni qaytaradi', async () => {
    const matchPrecache = vi.fn(async (url) => ({ url }));
    const resolve = createOfflineFallbackResolver({ matchPrecache });

    const response = await resolve({ request: { mode: 'navigate' } });

    expect(response).toEqual({ url: APP_SHELL_PAGE });
    expect(matchPrecache).toHaveBeenCalledWith(APP_SHELL_PAGE);
  });

  it('app shell cache miss bo\'lsa offline.html ga tushadi', async () => {
    const matchPrecache = vi.fn(async (url) => (url === OFFLINE_PAGE ? { url } : undefined));
    const resolve = createOfflineFallbackResolver({ matchPrecache });

    const response = await resolve({ request: { mode: 'navigate' } });

    expect(response).toEqual({ url: OFFLINE_PAGE });
    expect(matchPrecache).toHaveBeenNthCalledWith(1, APP_SHELL_PAGE);
    expect(matchPrecache).toHaveBeenNthCalledWith(2, OFFLINE_PAGE);
  });

  it('ikkala sahifa ham cache miss bo\'lsa error response qaytaradi', async () => {
    const errorResponse = { type: 'error' };
    const matchPrecache = vi.fn(async () => undefined);
    const resolve = createOfflineFallbackResolver({
      matchPrecache,
      createErrorResponse: () => errorResponse,
    });

    await expect(resolve({ request: { mode: 'navigate' } })).resolves.toBe(errorResponse);
  });

  it('navigatsiya bo\'lmagan so\'rovlarda keshga murojaat qilmaydi', async () => {
    const matchPrecache = vi.fn();
    const errorResponse = { type: 'error' };
    const resolve = createOfflineFallbackResolver({
      matchPrecache,
      createErrorResponse: () => errorResponse,
    });

    const response = await resolve({ request: { mode: 'cors' } });

    expect(response).toBe(errorResponse);
    expect(matchPrecache).not.toHaveBeenCalled();
  });

  it('matchPrecache berilmasa ham xavfsiz ishlaydi', async () => {
    const resolve = createOfflineFallbackResolver({
      createErrorResponse: () => ({ type: 'error' }),
    });

    await expect(resolve({ request: { mode: 'navigate' } })).resolves.toEqual({ type: 'error' });
    await expect(resolve()).resolves.toEqual({ type: 'error' });
  });

  it('standart error response Response.error() bo\'ladi', async () => {
    const resolve = createOfflineFallbackResolver({ matchPrecache: async () => undefined });
    const response = await resolve({ request: { mode: 'navigate' } });

    expect(response.type).toBe('error');
  });
});
