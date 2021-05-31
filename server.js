'use strict';

require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const API_KEY = process.env.GODEYEZ_API_KEY;
const BASE_URL = `https://api`;
const PORT = process.env.PORT || 3000;

function dataTransfer(req, res) {
    res.json({"msg" : "Hello World"});
}

function startServer() {
    const app = express();
    // Redirect HTTP to HTTPS,
    app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

    // Logging requests
    app.use((req, resp, next) => {
        const now = new Date();
        const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
        const path = `"${req.method} ${req.path}"`;
        const m = `${req.ip} - ${time} - ${path}`;

        console.log(m);
        next();
    });

    // Handle Request for the data
    app.get('/data', dataTransfer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));

    // Start the server
    return app.listen(PORT, () => {
        console.log(`Local DevServer Started on port ${PORT}...`);
    });
}

startServer();