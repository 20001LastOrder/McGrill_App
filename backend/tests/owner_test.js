const request = require('supertest');
const server = require('../server');

const owner_normal1 = {
    owner:{
        "name": "Dashen Xia",
        "email": "dashen.xia@mail.mcgill.ca",
        "password": "123xwz",
        "address" : {
            "street": "2100 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1K6",
        }
    },
    restaurant:{
        name: 'shitang',
        address: {
            "street": "2200 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1M6"
        }
    }
}

const owner_incomplete = {
    owner:{
        "name": "",
        "email": "",
        "password": "",
        "address" : {
            "street": "",
            "city": "",
            "zip": "",
        },
    },
    restaurant:{
        name: 'shitang',
        address: {
            "street": "2200 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1M6"
        }
    }
}

const non_registered_account = {
    "email": "randomuser@gmail.com",
    "password":"123kobe",
};

module.exports = () => {
describe('Post /owner/signup', () => {
    it('should register a new user (owner)', async () => {
    const res = await request(server)
        .post('/owner/signup')
        .type("json")
        .send(owner_normal1);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('address.street');
    expect(res.body).toHaveProperty('address.city');
    expect(res.body).toHaveProperty('address.zip'); 
    expect(res.body).toHaveProperty('restaurants'); 
    expect(res.body.name).toBe(owner_normal1.owner.name);
    expect(res.body.email).toBe(owner_normal1.owner.email);
    expect(res.body.address.street).toBe(owner_normal1.owner.address.street.toLowerCase());
    expect(res.body.address.city).toBe(owner_normal1.owner.address.city.toLowerCase());
    expect(res.body.address.zip).toBe(owner_normal1.owner.address.zip.toLowerCase());
    expect(res.body.restaurants.length).toBe(1);
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
        .set('email', owner_normal1.owner.email).
        set('password', owner_normal1.owner.password).
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
}
