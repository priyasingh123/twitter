const mongoose = require('mongoose')
const {Schema} = mongoose

const TweetSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    username: {
        type: String,
        isRequired: true
    },
    description: {
        type: String,
        isRequired: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const Tweets = mongoose.model('tweets', TweetSchema)
module.exports = Tweets