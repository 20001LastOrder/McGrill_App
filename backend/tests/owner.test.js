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

const owner_normal1 = {
    "username": "wenzongxia",
    "email": "wenzong.xia@mail.mcgill.ca",
    "password": "123xwz",
    "address" : {
        "street": "2100 Boul de Masionneuve",
        "city": "montreal",
        "zip": "H3H1K6",
    },
    "restaurant_address": {
        "street": "2200 Boul de Masionneuve",
        "city": "montreal",
        "zip": "H3H1M6"
    }
}

const owner_incomplete = {
    "username": "",
    "email": "",
    "password": "",
    "address" : {
        "street": "",
        "city": "",
        "zip": "",
    },
    "restaurant_address": {
        "street": "",
        "city": "",
        "zip": ""
    }
}

const non_registered_account = {
    "email": "randomuser@gmail.com",
    "password":"123kobe",
};

describe('Post /owner/signup', () => {
    it('should register a new user (owner)', async () => {
    const res = await request(server)
        .post('/owner/signup')
        .type("json")
        .send(owner_normal1);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('address.street');
    expect(res.body).toHaveProperty('address.city');
    expect(res.body).toHaveProperty('address.zip'); 
    expect(res.body.username).toBe(owner_normal1.username);
    expect(res.body.email).toBe(owner_normal1.email);
    expect(res.body.address.street).toBe(owner_normal1.address.street.toLowerCase());
    expect(res.body.address.city).toBe(owner_normal1.address.city.toLowerCase());
    expect(res.body.address.zip).toBe(owner_normal1.address.zip.toLowerCase());
    expect(res.body.restaurant_address.street).toBe(owner_normal1.restaurant_address.street.toLowerCase());
    expect(res.body.restaurant_address.city).toBe(owner_normal1.restaurant_address.city.toLowerCase());
    expect(res.body.restaurant_address.zip).toBe(owner_normal1.restaurant_address.zip.toLowerCase());
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(owner_normal1.password);
    })
});

describe('Post /owner/signup', () => {
    it('should not register a new user (owner) with empty fields', async () => {
    const res = await request(server)
        .post('/owner/signup')
        .type("json")
        .send(owner_incomplete);
    expect(res.statusCode).toEqual(400);
    })
});

describe('Post /owner/signup', () => {
    it('should not register a new user with an existing email address (owner)', async () => {
    const res = await request(server)
        .post('/owner/signup')
        .type("json")
        .send(owner_normal1);
    expect(res.statusCode).toEqual(400);
    })
});


describe('Get /owner/login', () => {
    it('should login the user and give back a token', async () => {
    const res = await request(server)
        .get('/owner/login')
        .set('email', owner_normal1.email).
        set('password', owner_normal1.password).
        send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    })
});

describe('Get /owner/login', () => {
    it('should not login the non-registered user', async () => {
    const res = await request(server)
        .get('/owner/login')
        .set('email', non_registered_account.email).
        set('password', non_registered_account.password).
        send();
    expect(res.statusCode).toEqual(400);
    })
});

describe('Get /owner/login', () => {
    it('should not login the registered user with wrong password', async () => {
    const res = await request(server)
        .get('/owner/login')
        .set('email', non_registered_account.email).
        set('password', non_registered_account.password).
        send();
    expect(res.statusCode).toEqual(400);
    })
});

afterAll(clearDatabase);