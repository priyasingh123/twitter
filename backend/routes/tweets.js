const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const fetchUser = require('../middleware/fetchUser')
const Tweets = require('../models/Tweet')
const User = require('../models/User')

//ROUTE-1 
//Post a tweet
///api/tweet/post
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


//ROUTE-2
//Get all tweets
///api/tweet/alltweets
router.get ('/alltweets', fetchUser, async(req, res) => {
    let page = parseInt (req?.query?.page)
    let limit = 5
    let startIndex = (page-1)*limit
    let endIndex = (page)*limit
    let results = {}
    if (startIndex > 0) {
        results.previous = {
            page: page-1
        }
    }
    
    
    try {
        const userInfo = await User.findById(req.user.id)
        let allTweets = []
        if (userInfo.following.length > 0) {
            allTweets = await Promise.all(userInfo.following.map(async (e) => {
                const user = await User.findOne({ email: e });
                const tweets = await Tweets.find({ user: user?._id }).populate({path: 'user', select: 'name'}).select('username description date')
                return tweets
            }))
        }
        const myTweets = await Tweets.find({user: req.user.id}).populate({path:'user', select: 'name'}).select('username description date')
        allTweets = [...allTweets, myTweets]
        allTweets = allTweets?.flat(Infinity)

        if (endIndex < allTweets?.length) {
            results.next = {
                page: page+1
            }
        }
        //sort allTweets based on latest date
        allTweets = allTweets.sort ((a,b) => b.date-a.date)
        results.results = allTweets.slice(startIndex, endIndex)
        console.log (results)
        res.status(200).json(results)
    } catch(err) {
        console.log (err)
        res.status(500).send({error: err.message})
    }
    
    
})

module.exports = router