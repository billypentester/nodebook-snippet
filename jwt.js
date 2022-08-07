var jwt = require('jsonwebtoken');

const data = {
    "name":"Bilal Ahmad",
    "email":"bilal@gmail.com"
}

const secretKey = "secretKey";

// Signing the data

var token = jwt.sign(data, secretKey, { expiresIn: 60 * 60 });

console.log(token);

// Verifying the data

var decode  = jwt.verify(token, secretKey);

console.log(decode);




