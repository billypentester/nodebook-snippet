const axios = require('axios');
const { user } = require('../models/schema');
const mongoose = require('mongoose')

beforeEach(async() => {

    console.log("beforeEach");
    await user.deleteMany({});
    await user.create({
      "firstname": "bilal",
      "lastname": "ahmad",
      "email": "billy@gmail.com",
      "phonenumber": 1234567890,
      "password": "232323"
    })

}, 1000);


afterAll( async () =>{
  await mongoose.connection.close()
})

describe('\nAPI test : GET method ', () => {
  
  test('Get all users', async() => {

    var result = await axios.get("http://localhost:3000/user")

    expect(result.status).toBe(200);
    expect(result.config.method).toBe('get');
    expect(result.data).toBeDefined();
    expect(Array.isArray([result.data])).toBe(true);
    
  })

  test('Get single user with email', async() => {

    var result = await axios.get("http://localhost:3000/user/billy@gmail.com")

    expect(result.status).toBe(200);
    expect(result.config.method).toBe('get');
    expect(result.data).toBeDefined();
    expect(Array.isArray([result.data])).toBe(true);
    
  })

  test('Get single user without email', async() => {

    var result = await axios.get("http://localhost:3000/user/")

    expect(result.status).toBe(200);
    expect(result.config.method).toBe('get');
    expect(result.data).toBeDefined();
    expect(Array.isArray([result.data])).toBe(true);
    
  })

  test('Get single user with wrong email', async() => {

    try {
      var result = await axios.get("http://localhost:3000/user/john@gmail.com")  
    } 
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.response.status).toBe(404);
        expect(error.response.config.method).toBe('get');
        expect(error.response.data.message).toBe('User not found');
    }
    
  })

})

describe('\nAPI test : POST method ', () => {
  
  test('Create a user', async() => {

    var result = await axios.post("http://localhost:3000/user/create", {
      "firstname": "talha",
      "lastname": "mujahid",
      "email": "talha@gmail.com",
      "phonenumber": "123456789",
      "password": "232323",
    })

    expect(result.status).toBe(200);
    expect(result.config.method).toBe('post');
    expect(result.data).toBeDefined();
    expect(typeof result.data).toBe('object');
    
  })

  test('Create a user with no data', async() => {

    try {
      var result = await axios.post("http://localhost:3000/user/create")
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('post');
          expect(error.response.data.message).toBe('User data is required');
    }
    
  })

  test('Create a user with wrong data', async() => {

    try {
      var result = await axios.post("http://localhost:3000/user/create",{
        "firstname": "bilal",
        "lastname": "ahmad",
        "email": "billygmail.lmn",
        "phonenumber": 1234567890,
        "password": "232323"
      })
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('post');
          expect(error.response.data.message).toBeDefined();
    }
    
  })


  test('Create a user with already existing email', async() => {

    try {
      var result = await axios.post("http://localhost:3000/user/create",{
        "firstname": "bilal",
        "lastname": "sabir",
        "email": "billy@gmail.com",
        "phonenumber": 1234567890,
        "password": "232323"
      })
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(409);
          expect(error.response.config.method).toBe('post');
          expect(error.response.data.message).toBe('User already exists');
    }
    
  })


})


describe('\nAPI test : PATCH method ', () => {
  
  test('update a user', async() => {

    var result = await axios.patch("http://localhost:3000/user/update/billy@gmail.com", {
      "firstname": "billy",
      "lastname": "pentester"
    })

    expect(result.status).toBe(200);
    expect(result.config.method).toBe('patch');
    expect(result.data.message).toBe('Account successfully updated')
    
  })

  test('update a user without email', async() => {

    try {
      var result = await axios.patch("http://localhost:3000/user/update/", {
        "firstname": "billy",
        "lastname": "pentester"
      })
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('patch');
          expect(error.response.data.message).toBe('Email is required');
    }
    
  })

  test('update a user without data', async() => {

    try {
      var result = await axios.patch("http://localhost:3000/user/update/billy@gmail.com")
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('patch');
          expect(error.response.data.message).toBe('User data is required');
    }
    
  })

  test('delete a user with wrong format email', async() => {

    try {
      var result = await axios.patch("http://localhost:3000/user/update/johngmail.co", {
        "firstname": "billy12345",
        "lastname": "pentester"
      })
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('patch');
    }
    
  })

  test('delete a user with non existing email', async() => {

    try {
      var result = await axios.patch("http://localhost:3000/user/update/john@gmail.com", {
        "firstname": "billy12345",
        "lastname": "pentester"
      })
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(404);
          expect(error.response.config.method).toBe('patch');
          expect(error.response.data.message).toBe('Account not found')
    }
    
  })

  test('delete a user with wrong data', async() => {

    try {
      var result = await axios.patch("http://localhost:3000/user/update/", {
        "firstname": "billy12345",
        "lastname": "pentester"
      })
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('patch');
    }
    
  })

})


describe('\nAPI test : DELETE method ', () => {
  
  test('delete a user', async() => {

    var result = await axios.delete("http://localhost:3000/user/delete/billy@gmail.com")

    expect(result.status).toBe(200);
    expect(result.config.method).toBe('delete');
    expect(result.data.message).toBe('Account successfully deleted')
    
  })

  test('delete a user without email', async() => {

    try {
      var result = await axios.delete("http://localhost:3000/user/delete")
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(400);
          expect(error.response.config.method).toBe('delete');
          expect(error.response.data.message).toBe('Email is required');
    }
    
  })

  test('delete a user with wrong email', async() => {

    try {
      var result = await axios.delete("http://localhost:3000/user/delete/john@gmail.com")
    } 
    catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.response.status).toBe(404);
          expect(error.response.config.method).toBe('delete');
          expect(error.response.data.message).toBe('Account not found')
    }
    
  })

})


