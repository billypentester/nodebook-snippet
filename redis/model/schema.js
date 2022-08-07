const mongoose = require('mongoose');
const connection = require('./../database/conn.js');

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
        required : true,
        unique : true
    },
    password : String
})

// database CRUD operations

const user = new mongoose.model('user',userschema);

module.exports = { user };