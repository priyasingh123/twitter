const express = require('express')
const User = require('../models/User')
const {body, validationResult} = require('express-validator')

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

        user = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        return res.json(user)
    } catch (error) {
        console.log ('error',error)
        return res.status(500).send (error)
    }
    
})

router.post ('/signin', [
    body('email', 'Enter Email').notEmpty(),
    body('password', 'Enter password').notEmpty()
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    let user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).json({error: 'Invalid Credentials'})
    }
    console.log ('user ', user)
    if (user.password == req.body.password) {
        return res.status(200).json(user)
    }
    return res.status(400).json({error: 'Invalid Credentials'})
})

module.exports = router