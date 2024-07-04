const { checkIfBookIsAvailable, borrowBook, returnBook, checkUserBookings } = require('../Controllers/reservationController')

const router = require('express').Router()

router.post('/:bookId', borrowBook);
router.patch('/:reservationId', returnBook);
router.get('/available/:bookId', checkIfBookIsAvailable);
router.get('/', checkUserBookings);

module.exports = router