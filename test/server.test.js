/**
 * Server Test Suite
 * 
 * Comprehensive test suite for the Express.js server endpoints using
 * Node.js native test runner (node:test) and supertest library.
 * 
 * Contains 5 test cases that verify:
 * - GET / returns 'Hello world' with correct content-type
 * - GET /evening returns 'Good evening' with correct content-type
 * - Unknown routes return 404 status
 * 
 * @module test/server.test
 * @requires node:test
 * @requires node:assert
 * @requires supertest
 */

'use strict';

// Import Node.js native test runner components
const { describe, it } = require('node:test');

// Import Node.js built-in assertion module
const assert = require('node:assert');

// Import supertest for HTTP assertions
const request = require('supertest');

// Import the Express.js app instance (without auto-starting server)
const app = require('../index');

/**
 * Test suite for GET / endpoint
 * 
 * Tests the root endpoint which should return "Hello world"
 * with a 200 status code and text/html content-type.
 */
describe('GET /', () => {
    /**
     * Test: Root endpoint should return 'Hello world' with 200 status
     * 
     * Verifies that making a GET request to '/' returns:
     * - HTTP status code 200
     * - Response body exactly matching 'Hello world'
     */
    it('should return Hello world', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        
        assert.strictEqual(response.text, 'Hello world');
    });

    /**
     * Test: Root endpoint should have correct content-type header
     * 
     * Verifies that the response Content-Type header includes 'text/html'.
     * Express.js res.send() sets this by default for string responses.
     */
    it('should have correct content-type', async () => {
        const response = await request(app)
            .get('/');
        
        assert.match(response.headers['content-type'], /text\/html/);
    });
});

/**
 * Test suite for GET /evening endpoint
 * 
 * Tests the evening endpoint which should return "Good evening"
 * with a 200 status code and text/html content-type.
 */
describe('GET /evening', () => {
    /**
     * Test: Evening endpoint should return 'Good evening' with 200 status
     * 
     * Verifies that making a GET request to '/evening' returns:
     * - HTTP status code 200
     * - Response body exactly matching 'Good evening'
     */
    it('should return Good evening', async () => {
        const response = await request(app)
            .get('/evening')
            .expect(200);
        
        assert.strictEqual(response.text, 'Good evening');
    });

    /**
     * Test: Evening endpoint should have correct content-type header
     * 
     * Verifies that the response Content-Type header includes 'text/html'.
     * Express.js res.send() sets this by default for string responses.
     */
    it('should have correct content-type', async () => {
        const response = await request(app)
            .get('/evening');
        
        assert.match(response.headers['content-type'], /text\/html/);
    });
});

/**
 * Test suite for unknown routes (404 handling)
 * 
 * Tests that requests to non-existent routes return 404 status.
 * Express.js handles this automatically for undefined routes.
 */
describe('Unknown routes', () => {
    /**
     * Test: Unknown routes should return 404 status
     * 
     * Verifies that making a GET request to an undefined route
     * returns HTTP status code 404 (Not Found).
     */
    it('should return 404 for unknown routes', async () => {
        const response = await request(app)
            .get('/unknown')
            .expect(404);
        
        assert.strictEqual(response.status, 404);
    });
});
