const express = require('express');
const { user } = require('../models/schema')
const { createuser, deleteuser, updateuser } = require('./../middlewares/validation');
const router = express.Router()
require('dotenv').config()

// user actions
  
router.get('/user', async(req,res)=>{

    try{
        const userdata = await user.find()
        res.status(200).json(userdata)
    }
    catch(err){
        res.status(500).json(err.message)
    }

})

router.get('/user/:email',async(req,res)=>{

    try{
        const userdata = await user.find({ email: req.params.email })
        if(userdata.length === 0){
            res.status(404).json({message: 'User not found'})
        }
        else{
            res.status(200).json(userdata)
        }
    }
    catch(err){
        res.status(404).json(err.message)
    }

})

router.post('/user/create', createuser, async(req,res)=>{

    try{
        var userdata = new user(req.body)
        var result = await userdata.save()
        res.status(200).json(result)
    }
    catch(err){
        res.status(409).json({ message: "User already exists" })
    }

})

router.patch('/user/update/:email?', updateuser, async(req,res)=>{
    
    try{
        var result = await user.updateOne({email:req.params.email}, req.body, {new:true})
        if(result.matchedCount)
        {
            res.status(200).json({ message: "Account successfully updated" })
        }
        else
        {
            res.status(404).json({ message: "Account not found" })
        }
    }
    catch(err){
        res.status(500).json(err.message)
    }
    
})

router.delete('/user/delete/:email?', deleteuser,  async(req,res)=>{
    
    try{
        var result = await user.deleteOne({email:req.params.email})
        if(result.deletedCount)
        {
            res.status(200).json({ message: "Account successfully deleted" })
        }
        else
        {
            res.status(404).json({ message: "Account not found" })
        }
    }
    catch(err){
        res.status(400).json(err.message)
    }
    
})


module.exports = router