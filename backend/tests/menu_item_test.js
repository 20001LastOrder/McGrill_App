
const request = require('supertest');
const server = require('../server');

const owner_normal = {
    owner:{
        "name": "No Name",
        "email": "nameno@mail.mcgill.ca",
        "password": "123xwz",
        "address" : {
            "street": "210 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1K6",
        }
    },
    restaurant:{
        name: 'basha',
        address: {
            "street": "220 Boul de Masionneuve",
            "city": "montreal",
            "zip": "H3H1H6"
        }
    }
}

const sample_menu_item = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
};

const expected_menu_item_retrived = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
}

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
    return obj;
};

module.exports = () =>{
describe('Create a Menu Item to a restaurant', () => {
    it('should create a menu item for the passed in restaurant', async () => {
        let obj = await createAndGetRestaurantIdPlusToken(); 
        let restaurant_id = obj.restaurant_id;
        let owner_id = obj.owner_id;
        let token = obj.token;
        let email = obj.email;
        const res = await request(server)
                .post('/menu/item/create?restaurantId='+restaurant_id)
                .set('Authorization',`Bearer ${token}`)
                .set('email', email)
                .send(sample_menu_item);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('menuitems');
        expect(res.body.menuitems.length).toEqual(1);
    })
});
}