const request = require('supertest');
const server = require('../server');

const consumer = {
	"name":"hanzawa",
	"email":"hanzawa.naoki@tcb.com",
	"password":"legalhigh",
	"address":{
        "street":"87 Kakudacho Kita Ward",
	    "city":"Osaka",
        "zip":"PF3X4C"
    }
};

const owner_and_restaurant = {
    owner: {
        "name": "hattori",
        "email": "hattori@gmail.com",
        "password": "sakaimasato",
        "address":{
            "street":"boom",
            "city":"zoom",
            "zip":"HHHHHH"
        }
    },
    restaurant: {
        "name":"La Butte Boisee",
        "address":{
            "street":"6 Chome 19 6",
            "city":"Tokyo",
            "zip":"JM379P"
        }
    }
};

const sample_menu_item = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
};

async function createRestaurantAndUserAndFoodAndOrder() {
    let obj = {};
    const register = await request(server)
        .post('/owner/signup')
        .type("json")
        .send(owner_and_restaurant);
    expect(register.statusCode).toEqual(201);
    obj.restaurant_id = register.body.restaurants[0];

    const res = await request(server)
        .post('/user/signup')
        .type("json")
        .send(consumer);
    expect(res.statusCode).toEqual(201);
    obj.consumer_id = res.body._id;

    const ownerlogin = await request(server)
        .get('/owner/login')
        .set('email', owner_and_restaurant.owner.email)
        .set('password', owner_and_restaurant.owner.password)
        .send();
    expect(ownerlogin.statusCode).toEqual(200);
    obj.token = ownerlogin.body.token;

    const food = await request(server)
        .post('/menu/item/create?restaurantId='+obj.restaurant_id)
        .set('Authorization',`Bearer ${obj.token}`)
        .set('email', owner_and_restaurant.owner.email)
        .type("json")
        .send(sample_menu_item);
    expect(food.statusCode).toEqual(201);
    obj.food_id = food.body.menuitems[0];

    let make_order = {
        "customerId":obj.consumer_id,
        "restaurantId":obj.restaurant_id,
        "order_items":[obj.food_id]
    };

    let order = await request(server)
        .post('/order/create')
        .type("json")
        .send(make_order);
    expect(order.statusCode).toEqual(201);
    obj.order_id = order.body._id;

    return obj;
};

module.exports = () => {
    describe('Test order status update', () => {
        it('create a new restaurant, a new user, a new order, then change the status to complete', async () => {
            let obj = await createRestaurantAndUserAndFoodAndOrder();
            let toUpdate = {
                orderId: obj.order_id,
                status: "COMPLETE"
            }
            let update = await request(server)
                .post("/order/update")
                .type("json")
                .send(toUpdate);
            expect(update.statusCode).toEqual(201);
            expect(update.body.status).toEqual(toUpdate.status);
        });
    });
};