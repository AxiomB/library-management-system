const { DataTypes } = require('sequelize')
const { sequelize } = require('../../adapters/infrastructure/database')

const BookRepository = sequelize.define(
    'book',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfPublication: {
            type: DataTypes.DATE,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currentlyAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date
        },
    },
    { updatedAt: false }
)

module.exports = BookRepository
