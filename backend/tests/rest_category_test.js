const request = require('supertest');
const server = require('../server');

let token = "";

const owner_normal = {
    owner:{
        "name": "sxm",
        "email": "sxm@mail.mcgill.ca",
        "password": "lxyabcd",
        "address" : {
            "street": "210 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1K6",
        }
    },
    restaurant:{
        name: 'sanxiamian',
        address: {
            "street": "8888 The Boulevard",
            "city": "Westmount",
            "zip": "H3Y1T8"
        }
    }
};

let updated_rest = {
    address: {
        "street": "1785-148 Street",
        "city": "Surrey",
        "zip": "V4A4M6"
    }
}

const sample_category = {
    "category" : [
        "suzhou", 
        "jinan"
    ]
};

const sample_category2 = {
    "category" : [
        "qingdao", 
        "nanchang"
    ]
};

const sample_categorym = {
    "category" : [
        "suzhou", 
        "jinan",
        "qingdao", 
        "nanchang"
    ]
};

const sample_categorys = {
    "category" : [
        "jinan",
        "qingdao"
    ]
};

const sample_categoryns = {
    "category" : [
        "shenzhen",
        "qingdao"
    ]
};

async function createAndGetRestaurantIdPlusToken () {
    let obj = {};
    const register = await request(server)
        .post('/owner/signup')
        .type("json")
        .send(owner_normal);
    expect(register.statusCode).toEqual(201);
    const res = await request(server)
        .get('/owner/login')
        .set('email', owner_normal.owner.email).
        set('password', owner_normal.owner.password).
        send();
    expect(res.statusCode).toEqual(200);
    obj.restaurant_id = register.body.restaurants[0];
    obj.user_id = res.body._id;
    obj.token = res.body.token;
    obj.email = owner_normal.owner.email;
    token = res.body.token;
    updated_rest._id = obj.restaurant_id;
    return obj;
};

async function createCategory () {
    let obj = await createAndGetRestaurantIdPlusToken(); 
    let restaurant_id = obj.restaurant_id;
    let owner_id = obj.owner_id;
    let token = obj.token;
    let email = obj.email;
    let res = await request(server)
            .put('/restaurant/addRestaurantCategory?restaurantId=' + restaurant_id)
            .set('Authorization',`Bearer ${token}`)
            .set('email', email)
            .send(sample_category);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('category');
    expect(res.body.category).toEqual(sample_category.category);
    let res2 = await request(server)
            .put('/restaurant/addRestaurantCategory?restaurantId=' + restaurant_id)
            .set('Authorization',`Bearer ${token}`)
            .set('email', email)
            .send(sample_category2);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveProperty('category');
    expect(res2.body.category).toEqual(sample_categorym.category);
    return obj;
};

module.exports = () => {
    describe('Add a set of category to a restaurant', () => {
        it('should create a category for the passed in restaurant and find by query', async () => {
            let obj = await createCategory(); 
            let restaurant_id = obj.restaurant_id;
            let owner_id = obj.owner_id;
            let token = obj.token;
            let email = obj.email;
            let res = await request(server)
                    .get('/restaurant/getByCategory')
                    .set('Authorization',`Bearer ${token}`)
                    .query(sample_categorys)
            expect(res.statusCode).toEqual(200);
            expect((res.body[0])._id).toEqual(restaurant_id);
            let res2 = await request(server)
                    .get('/restaurant/getByCategory')
                    .set('Authorization',`Bearer ${token}`)
                    .query(sample_categoryns);
            expect(res2.statusCode).toEqual(200);
            expect(res2.body).toEqual([]);
        });
    });
    describe('Update info of a restaurant', () => {
        it('should update a restaurant', async () => {
            let res = await request(server)
                    .put('/restaurant/update')
                    .set('Authorization',`Bearer ${token}`)
                    .send(updated_rest)
            expect(res.statusCode).toEqual(200);
            expect((res.body)._id).toEqual(updated_rest._id);
            expect((res.body).address).toEqual(updated_rest.address);
        });
    });
};