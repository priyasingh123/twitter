const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const fetchUser = require('../middleware/fetchUser')
const Tweets = require('../models/Tweet')
const User = require('../models/User')

//ROUTE-1 
//Post a tweet
router.post ('/post', fetchUser, [
    body('description', 'description cannot be empty').notEmpty()
], async (req, res) => {
    try {
        const results = validationResult(req)
        if (!results.isEmpty()) {
            return res.status(400).json(results.array())
        }

        const userId = req.user.id
        const user = await User.findById(userId)
        if (!user._id) {
            return res.status(401).json('Invalid User')
        }

        const tweet = await Tweets.create({
            user: user._id,
            date: new Date(),
            description: req.body.description,
            username: user.username
        })

        res.json(tweet)
    } catch(err) {
        console.log (err)
        res.status(500).send({error: err.message})
    }
    
    
})


// ROUTE-2
// View all tweets

module.exports = router