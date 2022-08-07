const axios =  require('axios')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.set('secret', 'billy')
    res.status(200).json({ "msg": "Hello World" });
})

app.post('/', (req, res) => {
    console.log(req.headers)
    res.status(400).json(req.body);
})


async function get()
{
    try {
        const result = await axios.get('http://localhost:3000/')
        console.log("URL: " + result.config.url)
        console.log("method: " + result.config.method)
        console.log("status: " + result.status)
        console.log(result.headers)
        console.log(result.data) 
    } 
    catch (error) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.message)
    }
}

// get()

async function post()
{
    try {
        const result = await axios.post('http://localhost:3000/', { "msg": "Hello World" }, { headers: { 'secret': 'billy' } });
        console.log("URL: " + result.config.url)
        console.log("method: " + result.config.method)
        console.log("status: " + result.status)
        console.log(result.headers)
        console.log(result.data) 
    } 
    catch (error) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.message)
    }
}

// post()



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})