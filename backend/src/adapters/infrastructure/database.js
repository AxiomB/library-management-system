const { database } = require('../../config/config');
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    dialect: 'mysql',
    port: database.port,
    logging: false,
})

async function checkConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection to DB has been established successfully.')
    } catch (error) {
        throw error
    }
}

async function syncModels(value) {
    const state = {
        alter: { alter: true },
        force: { force: true },
    }
    try {
        await sequelize.sync(state[value] || '')
        console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)
    } catch (error) {
        throw error
    }
}

function addRelationsToModels() {
    const UserRepository = require('./userRepository')
    const BookRepository = require('./bookRepository')
    const ReservationRepository = require('./reservationRepository')

    UserRepository.hasMany(ReservationRepository)
    ReservationRepository.hasOne(UserRepository)

    BookRepository.hasMany(ReservationRepository)
    ReservationRepository.hasOne(BookRepository)
}

module.exports = { sequelize, checkConnection, syncModels, addRelationsToModels }
