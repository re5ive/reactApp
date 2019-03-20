/**
 *  @fileOverview tnexus-ui Write what's going on in the file here.
 *  @file         app Created at 4/26/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

module.exports = app



