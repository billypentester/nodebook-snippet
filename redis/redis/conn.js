const { createClient } = require('redis');

const client = createClient({
    url: 'redis://billypentester:Webpass136!@redis-15762.c238.us-central1-2.gce.cloud.redislabs.com:15762',
    password: 'cVAAHIezp7xSGNZzCrZjA5OpaokZ7YV0'
});

async function connect() {
    try {
        await client.connect();
    } 
    catch (error) {
        console.log(error)
    }
}

connect()

module.exports = { client };