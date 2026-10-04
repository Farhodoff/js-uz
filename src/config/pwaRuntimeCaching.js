export const pwaGlobIgnores = [
  '**/lessons/*.js',
  '**/codeRunner.worker*.js',
  '**/challenges-*.js',
  '**/cynefin-*.js',
  '**/cytoscape*.js',
  '**/vendor-mermaid-*.js',
  '**/vendor-markdown-*.js',
  '**/katex-*.js',
  '**/*diagram*.js',
  '**/*Diagram*.js',
  '**/*definition*.js',
  '**/step*.js',
  '**/project*.js',
  '**/v8*.js',
  '**/distributed*.js',
  '**/dagre*.js',
  '**/cose-bilkent*.js',
  '**/swimlanes*.js',
  '**/chunk-*.js',
];

export const pwaRuntimeCaching = [
  {
    urlPattern: /\/assets\/lessons\/.*\.js$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'lessons-cache',
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: /\/assets\/.*(codeRunner|challenges|cynefin|cytoscape|vendor-mermaid|vendor-markdown|katex|diagram|definition|step|project|v8|distributed|dagre|cose-bilkent|swimlanes|chunk).*\.js$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'large-data-chunks-cache',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: ({ request }) => request && request.mode === 'navigate',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'html-cache',
      networkTimeoutSeconds: 2,
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts-cache',
      expiration: {
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'gstatic-fonts-cache',
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'images-cache',
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
];
