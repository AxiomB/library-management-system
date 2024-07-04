const { DataTypes } = require('sequelize')
const { sequelize } = require('../../adapters/infrastructure/database')

const ReservationRepository = sequelize.define(
    'reservation',
    {
        beginDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date
        },
    },
    { updatedAt: false }
)

module.exports = ReservationRepository
