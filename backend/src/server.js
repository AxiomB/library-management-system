const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const { checkConnection, addRelationsToModels, syncModels } = require("./adapters/infrastructure/database");

async function checkAndSyncMySQL() {
    await checkConnection()
    addRelationsToModels()
    syncModels('force')
}

function initializeAndListenWithExpress() {
    const app = express()
        .use(cors())
        .use(morgan('dev'))
        .use(express.json())
        .use('/api', require('../src/adapters/api/Routes'))

    return app;
}

function startAPI() {
    checkAndSyncMySQL()
    return initializeAndListenWithExpress()
}

const app = startAPI()

module.exports = app;