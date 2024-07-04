const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const { checkConnection, addRelationsToModels, syncModels } = require("./adapters/infrastructure/database");

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://martyrs-the-way-down.com', 'http://api.martyrs-the-way-down.com', /\.martyrs-the-way-down\.com$/], // Whitelist the domains you want to allow
    optionsSuccessStatus: 200
};

async function checkAndSyncMySQL() {
    await checkConnection()
    addRelationsToModels()
    syncModels('force')
}

function initializeAndListenWithExpress() {
    const app = express()
        .use(cors(corsOptions))
        .use(morgan('dev'))
        .use(express.json())
        .use('/api', require('../src/adapters/api/Routes/index'))

    return app;
}

function startAPI() {
    checkAndSyncMySQL()
    return initializeAndListenWithExpress()
}

const app = startAPI()

module.exports = app;