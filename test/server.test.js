/**
 * Server Test Suite
 * 
 * Comprehensive test suite for the Express.js server endpoints.
 * Uses Node.js native test runner and supertest for HTTP testing.
 * 
 * @module test/server.test
 * @requires node:test
 * @requires node:assert
 * @requires supertest
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../index');

/**
 * Test suite for the root endpoint
 */
describe('GET / endpoint', () => {
    test('should return 200 status code', async () => {
        const response = await request(app).get('/');
        assert.strictEqual(response.status, 200);
    });

    test('should return "Hello world" as response body', async () => {
        const response = await request(app).get('/');
        assert.strictEqual(response.text, 'Hello world');
    });

    test('should have text/html content-type', async () => {
        const response = await request(app).get('/');
        assert.ok(response.headers['content-type'].includes('text/html'));
    });
});

/**
 * Test suite for the evening endpoint
 */
describe('GET /evening endpoint', () => {
    test('should return 200 status code', async () => {
        const response = await request(app).get('/evening');
        assert.strictEqual(response.status, 200);
    });

    test('should return "Good evening" as response body', async () => {
        const response = await request(app).get('/evening');
        assert.strictEqual(response.text, 'Good evening');
    });

    test('should have text/html content-type', async () => {
        const response = await request(app).get('/evening');
        assert.ok(response.headers['content-type'].includes('text/html'));
    });
});

/**
 * Test suite for unknown routes (404 handling)
 */
describe('Unknown routes', () => {
    test('should return 404 for non-existent paths', async () => {
        const response = await request(app).get('/unknown');
        assert.strictEqual(response.status, 404);
    });
});
