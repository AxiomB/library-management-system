const { getUser, registerUser } = require('../Controllers/userController')

const router = require('express').Router()

router.get('/', getUser);
router.post('/', registerUser);

module.exports = router