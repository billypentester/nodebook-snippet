const mongoose = require('mongoose')
const conn = require('./../db/conn')

const userschema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    phonenumber : {
        type : Number
    },
    password : {
        type : String,
        required : true
    } 
})

// create collections

const user = new mongoose.model('user',userschema);

module.exports = { user }

