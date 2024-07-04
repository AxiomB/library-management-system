

const getUser = async (req, res) => {
    res.status(200).send("User Get")
}

const registerUser = async (req, res) => {
    res.status(200).send("User Post")
}

module.exports = {
    getUser,
    registerUser
}