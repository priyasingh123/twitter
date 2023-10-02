const express = require('express')
const User = require('../models/User')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const JWT_SECRET = 'tokenistokenandtokenistoken'

const router = express.Router()

//Create new User
router.post ('/create', [
    body('name', 'Enter a valid name').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty(),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password cannot be empty').notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({...req.body, msg:'User Exists'})
        }

        //creating hash from password
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        return res.json(authToken)

    } catch (error) {
        console.log ('error',error)
        return res.status(500).send (error)
    }
    
})

router.post ('/signin', [
    body('email', 'Enter Email').notEmpty(),
    body('password', 'Enter password').notEmpty()
], async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' })
        }
        //console.log('user ', user)
        const pwdCompare = await bcrypt.compare(req.body.password, user.password)
        if (!pwdCompare) {
            return res.status(400).json({ error: 'Invalid Credentials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({authToken, user_info: {name: user.name, username: user.username, email: user.email}})
    } catch (error) {
        return res.status(500).json({error: 'Bad Request'})
    }
    
    
})

module.exports = router