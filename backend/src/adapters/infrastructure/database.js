const knex = require('knex');
const { database } = require('../../config/config');

module.exports = knex({
    client: 'mysql2',
    connection: database,
});