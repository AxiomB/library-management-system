const jwt = require("jsonwebtoken")
const ReservationRepository = require('../../infrastructure/reservationRepository')
const BookRepository = require('../../infrastructure/bookRepository')
const UserRepository = require("../../infrastructure/userRepository")

/* Punto 2 de la prueba */
async function checkIfBookIsAvailable(req, res) {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if (err) return res.status(401).send('Token invalid')

            const bookToBorrow = await BookRepository.findByPk(req.params.bookId);

            if (bookToBorrow) {

                if (bookToBorrow.currentlyAvailable) {
                    res.status(200).json({
                        available: 'true',
                        message: 'Book Is Currently Available'
                    })
                }
                else {
                    res.status(200).json({
                        available: 'false',
                        message: 'Book Is Currently Unavailable'
                    })
                }
            }
            else {
                res.status(404).send('Book by sent id was not found')
            }
        })
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

/* Punto 3 de la prueba */
async function borrowBook(req, res) {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if (err) return res.status(401).send('Token invalid')

            const user = await UserRepository.findOne(req.body, {
                where: {
                    email: result.email
                }
            })

            const bookToBorrow = await BookRepository.findByPk(req.params.bookId);

            if (bookToBorrow) {

                if (bookToBorrow.currentlyAvailable) {

                    let beginDate = Date.now()
                    let endDate = Date.now()
                    endDate.setDate(beginDate + 14)

                    const newReservation = await ReservationRepository.create({
                        bookId: req.params.bookId,
                        userId: user.id,
                        beginDate: beginDate,
                        endDate: endDate
                    })

                    bookToBorrow.update({
                        currentlyAvailable: false
                    })
                    res.status(200).json(newReservation)
                }
                else {
                    res.status(400).send("Book is not currently available")
                }
            }
            else {
                res.status(404).send('No reservation for that book found')
            }
        })
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

/* Punto 4 de la prueba */
async function returnBook(req, res) {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if (err) return res.status(401).send('Token invalid')

            const [reservation_exists, reservation] = await ReservationRepository.update({
                realEndDate: Date.now()
            }, {
                returning: true,
                where: {
                    id: req.params.reservationId
                }
            })

            if (reservation_exists !== 0) {
                const [book_exists, book] = await BookRepository.update({
                    available: true
                }, {
                    returning: true,
                    where: {
                        id: reservation.bookId
                    }
                })
                if (book_exists !== 0) {
                    res.status(500).send('Error book asocioated to reservation doesnt exists')
                }
                else {
                    res.status(200).send('Book returned successfully')
                }
            }
            else {
                return res.status(404).send('No reservation found for that id')
            }
        })
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

/* Punto 5 de la prueba */
async function checkUserBookings(req, res) {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if (err) return res.status(401).send('Token invalid')
        })
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    checkIfBookIsAvailable,
    borrowBook,
    returnBook,
    checkUserBookings
}