const mongoose = require ('mongoose');
const {Schema} = mongoose

const UserSchema = new Schema ({
    name: {
        type: String,
        isRequired: true
    },
    username: {
        type: String,
        isRequired: true
    },
    email: {
        type: String,
        isRequired: true
    },
    password: {
        type: String,
        isRequired: true
    }
})

const User = mongoose.model('user', UserSchema)
module.exports = User