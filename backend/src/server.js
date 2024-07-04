const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const database = require("./adapters/infrastructure/database");

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://martyrs-the-way-down.com', 'http://api.martyrs-the-way-down.com', /\.martyrs-the-way-down\.com$/], // Whitelist the domains you want to allow
    optionsSuccessStatus: 200
};

const app = express()
    .use(cors(corsOptions))
    .use(morgan('dev'))
    .use(express.json())
    .use('/api', require('../src/adapters/api/Routes/index'))

module.exports = app;