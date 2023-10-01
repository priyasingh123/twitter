const mongoose = require('mongoose')

let connection_url = "mongodb://127.0.0.1:27017/twitter"


async function connectToDB () {
    try {
        const connection = await mongoose.connect(connection_url)
        console.log ('connected')
    }
    catch (err) {
        console.log ('error occured', err)
    }
}

module.exports = connectToDB
 


