#!/usr/bin/env node
/**
 * Create the Account Dashboard page for Kixro custom account UI.
 * Requires: SHOPIFY_STORE, SHOPIFY_ADMIN_TOKEN
 */

const store = (process.env.SHOPIFY_STORE || 'mcr0nu-c1.myshopify.com').trim();
const token = (process.env.SHOPIFY_ADMIN_TOKEN || '').trim();

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
    console.error('Missing SHOPIFY_ADMIN_TOKEN. Create a custom app in Shopify Admin → Settings → Apps.');
    process.exit(1);
  }

  const { pages } = await api('GET', '/pages.json?handle=account-dashboard&limit=1');
  if (pages?.length) {
    console.log(`Page already exists: /pages/${pages[0].handle}`);
    return;
  }

  const { page } = await api('POST', '/pages.json', {
    page: {
      title: 'Account',
      handle: 'account-dashboard',
      template_suffix: 'account-dashboard',
      published: true,
    },
  });

  console.log(`Created page: /pages/${page.handle}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
