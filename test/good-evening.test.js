import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const BASE = 'http://127.0.0.1:3000';

let service;

before(async () => {
  service = spawn(process.execPath, ['server.js'], { stdio: ['ignore', 'pipe', 'inherit'] });
  // The single startup line on stdout is the service's readiness signal.
  await once(service.stdout, 'data');
});

after(() => service.kill('SIGTERM'));

describe('GET /good-evening', () => {
  test('F-004-RQ-001 /good-evening returns 200', async () => {
    const res = await fetch(`${BASE}/good-evening`);
    assert.strictEqual(res.status, 200);
    await res.text();
  });

  test('F-004-RQ-002 body is exactly Good evening', async () => {
    const res = await fetch(`${BASE}/good-evening`);
    assert.strictEqual(await res.text(), 'Good evening');
  });

  test('F-004-RQ-003 Content-Type declares text/plain', async () => {
    const res = await fetch(`${BASE}/good-evening`);
    assert.match(res.headers.get('content-type'), /^text\/plain/);
    await res.text();
  });

  test('F-004-RQ-004 repeated requests are identical and set no cookie', async () => {
    const first = await fetch(`${BASE}/good-evening`);
    const firstBody = await first.text();
    const second = await fetch(`${BASE}/good-evening`);
    const secondBody = await second.text();

    assert.strictEqual(first.status, second.status);
    assert.strictEqual(firstBody, 'Good evening');
    assert.strictEqual(secondBody, 'Good evening');
    assert.strictEqual(second.headers.get('set-cookie'), null);
  });

  test('F-004-RQ-005 a bare request with no query, body or custom headers succeeds', async () => {
    const res = await fetch(`${BASE}/good-evening`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(await res.text(), 'Good evening');
  });
});

describe('exact-match routing for /good-evening', () => {
  test('SC-02 /good-evening/ is not a registered path', async () => {
    const res = await fetch(`${BASE}/good-evening/`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });

  test('SC-02 /GOOD-EVENING is not a registered path', async () => {
    const res = await fetch(`${BASE}/GOOD-EVENING`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });

  test('SC-02 /good-evening?x=1 is not a registered path', async () => {
    const res = await fetch(`${BASE}/good-evening?x=1`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });
});
