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

const admin_normal1 = {
	"username":"wenzongxia",
	"email":"wenzong.xia@mail.mcgill.ca",
	"password":"123xwz",
    "address" : {
        "street": "2100 Boul de Masionneuve",
        "city": "montreal",
        "zip": "H3H1K6",
    },
	"firstname": "wenzong",
	"lastname": "xia"
}

const admin_incomplete = {
    "username": "",
    "email": "",
    "password": "",
    "address" : {
        "street": "",
        "city": "",
        "zip": "",
    },
	"firstname": "",
	"lastname": ""
}

const non_registered_account = {
    "email": "randomuser@gmail.com",
    "password":"123kobe",
};

describe('Post /admin/signup', () => {
    it('should register a new user (admin)', async () => {
    const res = await request(server)
        .post('/admin/signup')
        .type("json")
        .send(admin_normal1);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('address.street');
    expect(res.body).toHaveProperty('address.city');
    expect(res.body).toHaveProperty('address.zip'); 
    expect(res.body).toHaveProperty('firstname');
    expect(res.body).toHaveProperty('lastname');
    expect(res.body.username).toBe(admin_normal1.username);
    expect(res.body.email).toBe(admin_normal1.email);
    expect(res.body.address.street).toBe(admin_normal1.address.street.toLowerCase());
    expect(res.body.address.city).toBe(admin_normal1.address.city.toLowerCase());
    expect(res.body.address.zip).toBe(admin_normal1.address.zip.toLowerCase());
    expect(res.body.firstname).toBe(admin_normal1.firstname);
    expect(res.body.lastname).toBe(admin_normal1.lastname);
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(admin_normal1.password);
    })
});

describe('Post /admin/signup', () => {
    it('should not register a new user (admin) with empty fields', async () => {
    const res = await request(server)
        .post('/admin/signup')
        .type("json")
        .send(admin_incomplete);
    expect(res.statusCode).toEqual(400);
    })
});

describe('Post /admin/signup', () => {
    it('should not register a new user with an existing email address (admin)', async () => {
    const res = await request(server)
        .post('/admin/signup')
        .type("json")
        .send(admin_normal1);
    expect(res.statusCode).toEqual(400);
    })
});

describe('Get /admin/login', () => {
    it('should login the user and give back a token', async () => {
    const res = await request(server)
        .get('/admin/login')
        .set('email', admin_normal1.email).
        set('password', admin_normal1.password).
        send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    })
});

describe('Get /admin/login', () => {
    it('should not login the non-registered user', async () => {
    const res = await request(server)
        .get('/admin/login')
        .set('email', non_registered_account.email).
        set('password', non_registered_account.password).
        send();
    expect(res.statusCode).toEqual(400);
    })
});

describe('Get /admin/login', () => {
    it('should not login the registered user with wrong password', async () => {
    const res = await request(server)
        .get('/admin/login')
        .set('email', non_registered_account.email).
        set('password', non_registered_account.password).
        send();
    expect(res.statusCode).toEqual(400);
    })
});

afterAll(clearDatabase);