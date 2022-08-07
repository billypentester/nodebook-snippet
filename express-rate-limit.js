const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()
const port = 3000

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use('/',limiter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})