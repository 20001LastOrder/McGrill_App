const request = require('supertest')
const server = require('../server')
const mongoose = require('mongoose');

beforeAll(clearDatabase);

function clearDatabase(done){
    mongoose.connection.dropDatabase((error ,result) => {
        if (error) {
          console.log('Reset database failed');
        } else {
          console.log('cleared');
        }
        done();
    });
};
var username = 'user1';
var password = '1234User1';

describe('Post /signup', () => {
    it('should register a new user', async () => {
    const res = await request(server)
        .post('/user/signup')
        .send({
        'username': username,
        'password': password,
        });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body['username']).toBe(username);
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(password);
    })
});

describe('Get /login', () => {
    it('should login the user and give back a token', async () => {
    const res = await request(server)
        .get('/user/login')
        .set('username', username).
        set('password', password).
        send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    })
});

