import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

export const PRECACHE_BUDGET_BYTES = 4_500_000;

function readPropertyKey(property) {
  if (!property || property.type !== 'Property') return null;
  if (property.key.type === 'Identifier') return property.key.name;
  return property.key.value;
}

function isPrecacheManifestEntry(node) {
  if (!node || node.type !== 'ObjectExpression') return false;

  const keys = node.properties.map(readPropertyKey);
  return keys.includes('url') && keys.includes('revision');
}

export function findPrecacheManifest(ast) {
  let best = null;

  walk.full(ast, (node) => {
    if (node.type !== 'ArrayExpression' || !Array.isArray(node.elements)) return;
    if (node.elements.length === 0) return;
    if (!node.elements.every(isPrecacheManifestEntry)) return;
    if (!best || node.elements.length > best.length) best = node.elements;
  });

  if (!best) return [];

  return best.map((entry) => {
    const result = {};
    for (const property of entry.properties) {
      const key = readPropertyKey(property);
      if (key) result[key] = property.value.value;
    }
    return { url: result.url, revision: result.revision };
  });
}

export function parsePrecacheManifest(source) {
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  return findPrecacheManifest(ast);
}

export function summarizePrecache(entries, resolveSize) {
  let totalBytes = 0;
  const missing = [];

  for (const entry of entries) {
    const size = typeof resolveSize === 'function' ? resolveSize(entry.url) : undefined;
    if (typeof size === 'number' && Number.isFinite(size)) {
      totalBytes += size;
    } else {
      missing.push(entry.url);
    }
  }

  return { count: entries.length, totalBytes, missing };
}

export function evaluatePrecacheBudget(totalBytes, budget = PRECACHE_BUDGET_BYTES) {
  const safeBudget = budget > 0 ? budget : PRECACHE_BUDGET_BYTES;
  return {
    ok: totalBytes <= safeBudget,
    totalBytes,
    budget: safeBudget,
    percent: Math.round((totalBytes / safeBudget) * 100),
  };
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}
