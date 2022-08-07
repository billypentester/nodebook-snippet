const express = require('express')
const path = require('path')
require('dotenv').config()
const cors = require('cors')
var app = express()
const port = process.env.PORT || 3000

// for server routes

const route = require('./routes/route')
const api = require('./api/user')

// middlewares for server

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

// middleware for routes

app.use(route)
app.use(api)

// listening on port

app.listen(port, ()=> {
    console.log(`Server is runing on port no : ${port}`)
})
