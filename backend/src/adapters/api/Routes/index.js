const router = require('express').Router()

router.use('/user', require('./userRoutes'))
router.use('/book', require('./bookRoutes'))

router.get("/health", function (req, res) {
    res.send("I am happy and healthy\n");
});

module.exports = router