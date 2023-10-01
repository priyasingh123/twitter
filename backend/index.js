const connectToDB = require('./db.js');
const express = require('express');
const cors = require ('cors')

connectToDB()

const app = express()
const port = 5000

app.use (cors())

app.use(express.json());

app.use ('/api/user', require ('./routes/user.js'))
//app.use ('/api/tweet', require ('./routes/tweet.js'))

app.listen (port, () => {
    console.log (`app listening at htts://localhost:${port}`)
})