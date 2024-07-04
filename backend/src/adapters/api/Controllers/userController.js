const UserRepository = require('../../infrastructure/userRepository')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
        req.body.password = hashedPassword
        const payload = { email: req.body.email }
        const secret = process.env.SECRET
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })
        await UserRepository.create(req.body)
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const login = async (req, res) => {
    try {
        const user = await UserRepository.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) return res.status(401).send('Error: Email or Password incorrect')
        const comparePass = bcrypt.compareSync(req.body.password, user.password)
        if (comparePass) {
            const payload = { email: req.body.email }
            const secret = process.env.SECRET
            const token = jwt.sign(payload, secret, { expiresIn: '1h' })
            return res.status(200).json({ token })
        } else {
            return res.status(401).json('Error: Email or Password incorrect')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    login,
    signup,
}