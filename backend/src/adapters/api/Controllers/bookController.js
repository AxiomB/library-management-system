const jwt = require("jsonwebtoken")
const bookRepository = require('../../../adapters/infrastructure/bookRepository')

async function getBookInfo(req, res) {

    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if (err) return res.status(401).send('Token invalid')

            const bookInfo = await bookRepository.findByPk(req.params.id);
            if (bookInfo) {
                return res.status(200).json(bookInfo);
            }
            else {
                return res.status(404).send('No book info by that ID')
            }
        })
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getBookInfo
}