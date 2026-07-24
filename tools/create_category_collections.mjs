#!/usr/bin/env node
/**
 * Create missing Kixro category smart collections (shoes, sandals).
 * Requires: SHOPIFY_STORE, SHOPIFY_ADMIN_TOKEN environment variables.
 */

const store = (process.env.SHOPIFY_STORE || 'mcr0nu-c1.myshopify.com').trim();
const token = (process.env.SHOPIFY_ADMIN_TOKEN || '').trim();

const COLLECTIONS = [
  {
    handle: 'shoes',
    title: 'Shoes',
    disjunctive: true,
    rules: [
      { column: 'tag', relation: 'equals', condition: 'shoe' },
      { column: 'type', relation: 'equals', condition: 'shoe' },
      { column: 'title', relation: 'contains', condition: 'Sneakers' },
      { column: 'title', relation: 'contains', condition: 'Walking Shoes' },
    ],
  },
  {
    handle: 'sandals',
    title: 'Sandals',
    disjunctive: true,
    rules: [
      { column: 'tag', relation: 'equals', condition: 'sandals' },
      { column: 'title', relation: 'contains', condition: 'Sandals' },
      { column: 'title', relation: 'contains', condition: 'Clogs' },
    ],
  },
];

async function api(method, path, payload) {
  const res = await fetch(`https://${store}/admin/api/2024-10${path}`, {
    method,
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

async function main() {
  if (!token) {
    console.error('Missing SHOPIFY_ADMIN_TOKEN environment variable.');
    process.exit(1);
  }

  const existing = await api('GET', '/smart_collections.json?limit=250');
  const handles = new Set((existing.smart_collections || []).map((c) => c.handle));

  for (const spec of COLLECTIONS) {
    if (handles.has(spec.handle)) {
      console.log(`Skip existing: ${spec.handle}`);
      continue;
    }
    await api('POST', '/smart_collections.json', {
      smart_collection: {
        title: spec.title,
        handle: spec.handle,
        published: true,
        disjunctive: spec.disjunctive,
        rules: spec.rules,
      },
    });
    console.log(`Created: ${spec.handle}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
