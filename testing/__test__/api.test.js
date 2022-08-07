const request = require('supertest');
const assert = require('assert');


describe('GET METHOD', ()=> {
    test('get all the users', (done)=> {
      request("http://localhost:3000")
        .get('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
