const express = require('express')
const { user } = require('./model/schema');
const { client } = require('./redis/conn');
const app = express()
const port = 3000

const middleware = async (req,res,next) => {

    try{
        const data = await client.get(req.params.username);

        if (data !== null) {
            console.log('data from redis');
            res.json(JSON.parse(data));
        } 
        else {
            next();
        }
    }
    catch(e) {
        res.json({ error : "something unexpected happened" })
    }

}

app.get('/api/:username', middleware,  async(req, res) => {

    try{
        const userdata = await user.find({ email: req.params.username })
        if(userdata.length === 0){
            res.json({ msg : "User not found" })
        }
        else{
            await client.set(req.params.username, JSON.stringify(userdata));
            console.log('redis set the data')
            res.json(userdata)
        }
    }
    catch(err){
        res.json({ error : err })
    }

})

// get('secret');

async function getter(key,value)
{
    const result = await client.get(key);
    console.log(result);
    await client.disconnect()
}

// getter('secret');

async function setter(key,value)
{
    await client.set(key,value);
    await client.disconnect()
}

// setter('secret','12345')

// more commands

// usage => await client.[method_name](parameters)

// set the key : SET name bilal
// get the key : GET name
// delete the key : DEL name
// get all keys : KEYS *
// delete all keys : flushall

// set ttl limit : expire name 10   /    setex name 10 bilal

// lists

// push an element to top of array : lpush friends bilal
// push an element to botton of array : rpush friends ahmad
// pop an element to top of array : lpop friends bilal
// pop an element to bottom of array : rpop friends ahmad
// get whole list : lrange friends 0  -1

// set (store unique value)

// add an item to set : SADD hobby "football"
// remove an item to set : SREM hobby "football"
// get all items in a set : SMEMBERS hobby

// hashes

// HSET person name bilal
// HSET person age 20
// HGET person name
// HGETALL person
// HDEL person age


app.listen(port, () => {
    console.log(`Example app listening on port: ${port}!`)
})