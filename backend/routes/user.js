const express = require('express')
const User = require('../models/User')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const JWT_SECRET = 'tokenistokenandtokenistoken'
const fetchUser = require('../middleware/fetchUser')

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
            password: secPass,
            following: []
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

//ROUTE-2
//signin with email and password
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

//ROUTE-3
//getnonfollowing
router.get('/getnonfollowing',fetchUser, async(req,res) => {
    const userInfo = await User.findById(req.user.id)
    const following = userInfo.following
    const allUsers = await User.find({_id: {$ne: req.user.id}})
    // console.log ('following array',following)
    let updatedUsers 
    if (following.length == 0) {
        //send all users in response
        // console.log ('here')
        updatedUsers = allUsers.map ((user) => {
            return {name: user.name, username: user.username, email: user.email}
        })
    }
    else {
        // select those users whose email not in following array
        updatedUsers = allUsers.filter ((user) => {
            if (following.find((email) => user.email == email) == undefined) {
                return ({name: user.name, username: user.username, email: user.email})
            }
        })
        updatedUsers = updatedUsers.map ((user) => {
            return {name: user.name, username: user.username, email: user.email}
        })
        console.log ('updated users', updatedUsers)
    }
    res.status(200).send (updatedUsers)
})

//ROUTE-4
//add to following
router.post('/addtofollowing', fetchUser, async (req, res) => {
    const userInfo = await User.findById(req.user.id)
    console.log ('email ',req.body)
    const updatedFollowing = [...userInfo.following, req.body.email]

    const update = await User.findOneAndUpdate({_id:req.user.id}, {following: updatedFollowing}, {new: true})
    console.log (update)
    res.status(200).json(update)
})



module.exports = router