#!/usr/bin/env python3
"""Create missing Kixro category collections (shoes, sandals) in Shopify Admin.

Requires in .env:
  SHOPIFY_STORE=mcr0nu-c1.myshopify.com
  SHOPIFY_ADMIN_TOKEN=shpat_...

Usage:
  python tools/create_category_collections.py
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request

COLLECTIONS = [
    {
        "handle": "shoes",
        "title": "Shoes",
        "rules": [{"column": "tag", "relation": "equals", "condition": "shoe"}],
    },
    {
        "handle": "sandals",
        "title": "Sandals",
        "rules": [{"column": "tag", "relation": "equals", "condition": "sandals"}],
    },
]


def load_env(path: str = ".env") -> dict[str, str]:
    values: dict[str, str] = {}
    if not os.path.exists(path):
        return values
    with open(path, encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def api_request(store: str, token: str, method: str, path: str, payload: dict | None = None) -> dict:
    url = f"https://{store}/admin/api/2024-10{path}"
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "X-Shopify-Access-Token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(request) as response:
        body = response.read().decode("utf-8")
        return json.loads(body) if body else {}


def get_existing_handles(store: str, token: str) -> set[str]:
    result = api_request(store, token, "GET", "/smart_collections.json?limit=250")
    return {item["handle"] for item in result.get("smart_collections", [])}


def create_smart_collection(store: str, token: str, spec: dict) -> None:
    payload = {
        "smart_collection": {
            "title": spec["title"],
            "handle": spec["handle"],
            "published": True,
            "rules": spec["rules"],
            "disjunctive": True,
        }
    }
    api_request(store, token, "POST", "/smart_collections.json", payload)
    print(f"Created smart collection: {spec['handle']}")


def main() -> int:
    env = {**load_env(), **os.environ}
    store = env.get("SHOPIFY_STORE", "").strip()
    token = env.get("SHOPIFY_ADMIN_TOKEN", "").strip()

    if not store or not token:
        print("Missing SHOPIFY_STORE or SHOPIFY_ADMIN_TOKEN in .env", file=sys.stderr)
        return 1

    try:
        existing = get_existing_handles(store, token)
        for spec in COLLECTIONS:
            if spec["handle"] in existing:
                print(f"Skip existing collection: {spec['handle']}")
                continue
            create_smart_collection(store, token, spec)
    except urllib.error.HTTPError as error:
        print(error.read().decode("utf-8"), file=sys.stderr)
        return 1

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
