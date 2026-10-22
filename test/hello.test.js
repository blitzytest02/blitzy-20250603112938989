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

after(async () => {
  service.kill('SIGTERM');
  await once(service, 'exit');
});

describe('GET /hello', () => {
  test('F-003-RQ-002 /hello returns 200', async () => {
    const res = await fetch(`${BASE}/hello`);
    assert.strictEqual(res.status, 200);
    await res.text();
  });

  test('F-003-RQ-001 body is exactly Hello world', async () => {
    const res = await fetch(`${BASE}/hello`);
    assert.strictEqual(await res.text(), 'Hello world');
  });

  test('F-003-RQ-003 Content-Type declares text/plain', async () => {
    const res = await fetch(`${BASE}/hello`);
    assert.match(res.headers.get('content-type'), /^text\/plain/);
    await res.text();
  });

  test('F-003-RQ-004 repeated requests are identical and set no cookie', async () => {
    const first = await fetch(`${BASE}/hello`);
    const firstBody = await first.text();
    const second = await fetch(`${BASE}/hello`);
    const secondBody = await second.text();

    assert.strictEqual(first.status, second.status);
    assert.strictEqual(firstBody, 'Hello world');
    assert.strictEqual(secondBody, 'Hello world');
    assert.strictEqual(second.headers.get('set-cookie'), null);
  });

  test('F-002-RQ-003 /hello succeeds for a bare request', async () => {
    const res = await fetch(`${BASE}/hello`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(await res.text(), 'Hello world');
  });
});

describe('GET /hello-world', () => {
  test('F-003-RQ-002 /hello-world returns 200', async () => {
    const res = await fetch(`${BASE}/hello-world`);
    assert.strictEqual(res.status, 200);
    await res.text();
  });

  test('F-003-RQ-001 /hello-world body is exactly Hello world', async () => {
    const res = await fetch(`${BASE}/hello-world`);
    assert.strictEqual(await res.text(), 'Hello world');
  });

  test('F-003-RQ-003 /hello-world Content-Type declares text/plain', async () => {
    const res = await fetch(`${BASE}/hello-world`);
    assert.match(res.headers.get('content-type'), /^text\/plain/);
    await res.text();
  });

  test('F-003-RQ-004 /hello-world repeated requests are identical and set no cookie', async () => {
    const first = await fetch(`${BASE}/hello-world`);
    const firstBody = await first.text();
    const second = await fetch(`${BASE}/hello-world`);
    const secondBody = await second.text();

    assert.strictEqual(first.status, second.status);
    assert.strictEqual(firstBody, 'Hello world');
    assert.strictEqual(secondBody, 'Hello world');
    assert.strictEqual(second.headers.get('set-cookie'), null);
  });
});

describe('exact-match routing', () => {
  test('SC-02 / is not a registered path', async () => {
    const res = await fetch(`${BASE}/`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });

  test('SC-02 /hello/ is not a registered path', async () => {
    const res = await fetch(`${BASE}/hello/`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });

  test('SC-02 /HELLO is not a registered path', async () => {
    const res = await fetch(`${BASE}/HELLO`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });

  test('SC-02 /hello?x=1 is not a registered path', async () => {
    const res = await fetch(`${BASE}/hello?x=1`);
    assert.strictEqual(res.status, 404);
    await res.text();
  });
});
