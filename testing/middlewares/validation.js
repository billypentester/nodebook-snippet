const Joi = require('joi');
const { user }  = require('../models/schema')

const createuser = async(req, res, next) => {

    try {
        if(Object.keys(req.body).length === 0)
        {
            return res.status(400).json({message: 'User data is required'})
        }
        const schema = Joi.object({
            firstname: Joi.string().alphanum().required().max(10),
            lastname: Joi.string().max(10),
            email: Joi.string().email().required(),
            phonenumber: Joi.number(),
            password: Joi.string().required()
        })
        const result = await schema.validateAsync(req.body);
        return next();
    }
    catch (err) { 
        return res.status(400).json({message: err.message})
    }

};  

const updateuser = async(req, res, next) => {

    try {
        if(!req.params.email){
            return res.status(400).json({message: 'Email is required'})
        }   
        if(Object.keys(req.body).length === 0)
        {
            return res.status(400).json({message: 'User data is required'})
        }
        const schema = Joi.object({
            firstname: Joi.string().alphanum().max(10),
            lastname: Joi.string().max(10),
            email: Joi.string().email(),
            phonenumber: Joi.number(),
            password: Joi.string()
        }).or('firstname', 'lastname', 'email','phonenumber', 'password').required()
    
        const schema2 = Joi.string().email().required();
        
        const result = await schema.validateAsync(req.body);
        const result2 = await schema2.validateAsync(req.params.email);

        return next();
    }
    catch (err) { 
        return res.status(400).json({message: err.message})
    }

}; 

const deleteuser = async(req, res, next) => {

    try {      
        if(!req.params.email){
            return res.status(400).json({message: 'Email is required'})
        }                                 
        const schema = Joi.string().email().required();
        const result = await schema.validateAsync(req.params.email);
        return next();
    }
    catch (err) { 
        return res.status(400).json({message: err.message})
    }

}; 

module.exports = { createuser, deleteuser, updateuser };