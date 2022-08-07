const mongoose = require('mongoose')

// database connection

const db = "mongodb://localhost:27017/test"

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then (()=> console.log("Database connection successful........") )
.catch ((err)=> console.log("Database connection not successful : \n" + err))

var conn = mongoose.connection;

// database model

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

async function getAll()
{
    try{
        const userdata = await user.find()
        console.log(userdata);
    }
    catch(err){
        console.log(err);
    }
}

// getAll()

async function getSingle(email)
{
    try{
        const userdata = await user.find({ email: email })
        if(userdata.length === 0){
            console.log("user not found")
        }
        else{
            console.log(userdata)
        }
    }
    catch(err){
        console.log(err)
    }
}

// getSingle("bilalsheikh2500@gmail.com")

async function createUser(data)
{
    try{
        var userdata = new user(data)
        var result = await userdata.save()
        console.log("User created")
    }
    catch(err){
        console.log(err)
    }
}

// createUser({ firstname: "Bilal", lastname: "Ahmad", email: "bilalsheikh2500@gmail.com", password: "qwerty"})

async function updateUser(email, data) {
    try{
        var result = await user.updateOne({email:email}, data, {new:true})
        if(result.matchedCount)
        {
            console.log("Account successfully updated")
        }
        else
        {
            console.log("Account not found")
        }
    }
    catch(err){
        console.log(err)
    }
}

// updateUser("bilalsheikh2500@gmail.com", { firstname: "Bilal", lastname: "Ahmad", email: "bilalsheikh2500@gmail.com", password: "qwerty"})

async function deleteUser(email)
{
    try{
        var result = await user.deleteOne({email:email})
        if(result.deletedCount)
        {
           console.log("Account successfully deleted")
        }
        else
        {
           console.log("Account not found")
        }
    }
    catch(err){
       console.log(err)
    }
}

// deleteUser("bilalsheikh2500@gmail.com")