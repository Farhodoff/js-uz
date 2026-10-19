export const OFFLINE_PAGE = 'offline.html';
export const APP_SHELL_PAGE = 'index.html';

export function isNavigationRequest(request) {
  return Boolean(request) && request.mode === 'navigate';
}

export function createOfflineFallbackResolver({ matchPrecache, createErrorResponse } = {}) {
  const errorResponse = typeof createErrorResponse === 'function'
    ? createErrorResponse
    : () => Response.error();

  return async function resolveOfflineFallback(options) {
    const request = options && options.request;

    if (!isNavigationRequest(request) || typeof matchPrecache !== 'function') {
      return errorResponse();
    }

    const appShell = await matchPrecache(APP_SHELL_PAGE);
    if (appShell) return appShell;

    const offlinePage = await matchPrecache(OFFLINE_PAGE);
    return offlinePage || errorResponse();
  };
}
