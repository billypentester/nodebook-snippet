const express = require('express');
const router = express.Router()

// main pages

router.get('/', async(req, res) => {

    res.status(200).json({ msg : "API is live" })
  
})

module.exports = router
