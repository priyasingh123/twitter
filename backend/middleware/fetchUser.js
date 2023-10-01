const jwt = require('jsonwebtoken')
const JWT_SECRET = 'tokenistokenandtokenistoken'
const User = require('../models/User')

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('SignIn Required')
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch(error) {
        res.status(500).json('SignIn Required')
    }
}

module.exports = fetchUser