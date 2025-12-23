/**
 * Main Express.js Server Application
 * 
 * This file implements a Node.js HTTP server using Express.js framework
 * with two GET endpoints:
 * - GET /        : Returns "Hello world"
 * - GET /evening : Returns "Good evening"
 * 
 * The server supports the PORT environment variable for configuration
 * and exports the Express app instance for testing purposes.
 * 
 * @module index
 * @requires express
 */

'use strict';

// Import Express.js framework
const express = require('express');

// Initialize Express application instance
const app = express();

/**
 * Server port configuration
 * Uses PORT environment variable if set, otherwise defaults to 3000
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

/**
 * Root endpoint handler
 * 
 * Responds to GET requests at the root path with a "Hello world" message.
 * 
 * @route GET /
 * @returns {string} Plain text response "Hello world"
 * @example
 * // curl http://localhost:3000/
 * // Response: Hello world
 */
app.get('/', (req, res) => {
    res.send('Hello world');
});

/**
 * Evening endpoint handler
 * 
 * Responds to GET requests at the /evening path with a "Good evening" message.
 * 
 * @route GET /evening
 * @returns {string} Plain text response "Good evening"
 * @example
 * // curl http://localhost:3000/evening
 * // Response: Good evening
 */
app.get('/evening', (req, res) => {
    res.send('Good evening');
});

/**
 * Conditional server startup
 * 
 * Only starts the HTTP server when this file is run directly (not imported).
 * This allows the app to be imported for testing without auto-starting the server.
 * 
 * @see https://nodejs.org/api/modules.html#accessing-the-main-module
 */
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

/**
 * Export the Express app instance
 * 
 * Exports the configured Express application for use in testing
 * and potential integration with other modules.
 * 
 * @type {express.Application}
 * @exports app
 */
module.exports = app;
