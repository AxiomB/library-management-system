const { getBookInfo } = require('../../api/Controllers/bookController')

const router = require('express').Router()

router.get('/:id', getBookInfo);

module.exports = router