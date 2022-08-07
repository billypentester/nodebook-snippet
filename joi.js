const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required().pattern(new RegExp('^[a-zA-Z]+$')),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.ref('password'),
    phone: Joi.string().required().min(10).max(10)
})


async function validate(data)
{
    try {
        const value = await schema.validateAsync(data);
        console.log(value)
    }
    catch (err) {
        console.log(err)
    }
}

validate({ 
    "name": "%script%alert('hello')%/script%", 
    "email": "bilalsheikh2500@gmail.com", 
    "password": "123456", 
    "confirmPassword": "123456", 
    "phone": "1234567890" 
})