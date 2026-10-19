import { cleanupOutdatedCaches, precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { pwaRuntimeCaching } from './config/pwaRuntimeCaching.js';
import { createOfflineFallbackResolver } from './config/pwaOffline.js';

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST || []);

const STRATEGIES = {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
};

function createStrategy(handler, options = {}) {
  const Strategy = STRATEGIES[handler];
  if (!Strategy) return null;

  const plugins = [];
  if (options.expiration) plugins.push(new ExpirationPlugin(options.expiration));
  if (options.cacheableResponse) plugins.push(new CacheableResponsePlugin(options.cacheableResponse));

  const strategyOptions = { ...options };
  delete strategyOptions.expiration;
  delete strategyOptions.cacheableResponse;
  return new Strategy({ ...strategyOptions, plugins });
}

pwaRuntimeCaching.forEach((rule) => {
  const strategy = createStrategy(rule.handler, rule.options);
  if (strategy) registerRoute(rule.urlPattern, strategy);
});

setCatchHandler(createOfflineFallbackResolver({ matchPrecache }));
