const request = require('supertest');
const server = require('../server');

const consumer = {
	"name":"kobebryant",
	"email":"kobe.bryant@mail.mcgill.ca",
	"password":"123kobe",
	"address":{
        "street":"220 Boul de Masionneuve",
	    "city":"montreal",
        "zip":"H3H1K6"
    }
};

const consumer_incomplete = {
	"name":" ",
	"email":"",
	"password":"",
	"address":{
        "street":"",
	    "city":"",
        "zip":""
    }
};

const non_registered_account = {
    "email": "randomuser@gmail.com",
    "password":"123kobe",
};

module.exports = ()=> {
describe('Post /user/signup', () => {
    it('should register a new user (customer)', async () => {
    const res = await request(server)
        .post('/user/signup')
        .type("json")
        .send(consumer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('address.street');
    expect(res.body).toHaveProperty('address.city');
    expect(res.body).toHaveProperty('address.zip'); 
    expect(res.body.name).toBe(consumer.name);
    expect(res.body.email).toBe(consumer.email);
    expect(res.body.address.street).toBe(consumer.address.street.toLowerCase());
    expect(res.body.address.city).toBe(consumer.address.city.toLowerCase());
    expect(res.body.address.zip).toBe(consumer.address.zip.toLowerCase());
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(consumer.password);
    consumer._id = res.body._id;
    })
});

describe('Post /user/signup', () => {
    it('should not register a new user (customer) with empty fields', async () => {
    const res = await request(server)
        .post('/user/signup')
        .type("json")
        .send(consumer_incomplete);
    expect(res.statusCode).toEqual(400);
    })
});

describe('Post /user/signup', () => {
    it('should not register a new user with an existing email address (customer)', async () => {
    const res = await request(server)
        .post('/user/signup')
        .type("json")
        .send(consumer);
    expect(res.statusCode).toEqual(400);
    })
});


describe('Get /user/login', () => {
    it('should login the user and give back a token', async () => {
    const res = await request(server)
        .get('/user/login')
        .set('email', consumer.email).
        set('password', consumer.password).
        send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    })
});

describe('Get /user/login', () => {
    it('should not login the non-registered user', async () => {
    const res = await request(server)
        .get('/user/login')
        .set('email', non_registered_account.email).
        set('password', non_registered_account.password).
        send();
    expect(res.statusCode).toEqual(400);
    })
});

describe('Get /user/login', () => {
    it('should not login the registered user with wrong password', async () => {
    const res = await request(server)
        .get('/user/login')
        .set('email', non_registered_account.email).
        set('password', non_registered_account.password).
        send();
    expect(res.statusCode).toEqual(400);
    //expect(res.body).toHaveProperty('token');
    })
});

describe('Put /user/update', () => {
    it('should update an existing user', async () => {
        const resLogin = await request(server)
        .get('/user/login')
        .set('email', consumer.email).
        set('password', consumer.password).
        send();
        expect(resLogin.statusCode).toEqual(200);
        expect(resLogin.body).toHaveProperty('token');
        consumer.name = "sanxiamian";
        let res2 = await request(server)
                        .put('/user/update')
                        .set('Authorization',`Bearer ${ resLogin.body.token }`)
                        .send(consumer);
        expect(res2.statusCode).toEqual(200);
        expect(res2.body._id).toEqual(consumer._id);
        expect(res2.body.name).toEqual("sanxiamian");
    });
});
}