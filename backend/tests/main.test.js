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

async function createAndGetRestaurantIdPlusToken () {
    res = await request(server)
        .get('/restaurant/login')
        .set('username', restaurant_username).
        set('password', restaurant_password).
        send();
    let obj = {};
    obj.id = res.body.id;
    obj.token = res.body.token;
    return obj;
};

var restaurant_username = 'restaurant1';
var restaurant_password = '1234Restaurant1';

const consumer = {
	"username":"kobebryant",
	"email":"kobe.bryant@mail.mcgill.ca",
	"password":"123kobe",
	"address":{
        "street":"220 Boul de Masionneuve",
	    "city":"montreal",
        "zip":"H3H1K6"
    }
};

const consumer_incomplete = {
	"username":" ",
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

const sample_menu_item = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
};

describe('Post /user/signup', () => {
    it('should register a new user (customer)', async () => {
    const res = await request(server)
        .post('/user/signup')
        .type("json")
        .send(consumer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('address.street');
    expect(res.body).toHaveProperty('address.city');
    expect(res.body).toHaveProperty('address.zip'); 
    expect(res.body.username).toBe(consumer.username);
    expect(res.body.email).toBe(consumer.email);
    expect(res.body.address.street).toBe(consumer.address.street.toLowerCase());
    expect(res.body.address.city).toBe(consumer.address.city.toLowerCase());
    expect(res.body.address.zip).toBe(consumer.address.zip.toLowerCase());
    expect(res.body).toHaveProperty('password');
    expect(res.body['password']).not.toBe(consumer.password);
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

describe('Create a Menu Item to a restaurant', () => {
    it('should create a menu item for the passed in restaurant', async () => {
        let obj = await createAndGetRestaurantIdPlusToken(); 
        let id = obj.id;
        let token = obj.token;
        const res = await request(server)
                .post('/menu/item/create?restaurantId='+id)
                .set('Authorization',`Bearer ${token}`)
                .send(sample_menu_item);
        expect(res.statusCode).toEqual(200);
    })
});

afterAll(clearDatabase);