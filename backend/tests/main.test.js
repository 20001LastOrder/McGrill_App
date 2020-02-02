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
var user_username = 'user1';
var user_password = '1234User1';

describe('Post /user/signup', () => {
    it('should register a new user', async () => {
    const res = await request(server)
        .post('/user/signup')
        .send({
        'username': user_username,
        'password': user_password,
        });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body['username']).toBe(user_username);
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(user_password);
    })
});

describe('Get /user/login', () => {
    it('should login the user and give back a token', async () => {
    const res = await request(server)
        .get('/user/login')
        .set('username', user_username).
        set('password', user_password).
        send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    })
});


var restaurant_username = 'restaurant1';
var restaurant_password = '1234Restaurant1';

describe('Post /restaurant/signup', () => {
    it('should register a new restaurant', async () => {
    const res = await request(server)
        .post('/restaurant/signup')
        .send({
        'username': restaurant_username,
        'password': restaurant_password,
        });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body['username']).toBe(restaurant_username);
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(restaurant_password);
    })
});

describe('Get /restaurant/login', () => {
    it('should login the restaurant and give back a token', async () => {
    const res = await request(server)
        .get('/restaurant/login')
        .set('username', username).
        set('password', restaurant_password).
        send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    })
});