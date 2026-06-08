#!/usr/bin/env node
/**
 * One-time OAuth login for npm run seo:report (when service account cannot be added in GSC/GA4 UI).
 * See docs/analytics-setup.md — section "План B: OAuth"
 */

import { runOAuthSetup } from './google-auth.mjs';

async function main() {
  let apis;
  try {
    const mod = await import('googleapis');
    apis = mod.google;
  } catch {
    console.error('Run: npm install');
    process.exit(1);
  }

  await runOAuthSetup(apis);
  console.log('\nТеперь запустите: npm run seo:report\n');
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
