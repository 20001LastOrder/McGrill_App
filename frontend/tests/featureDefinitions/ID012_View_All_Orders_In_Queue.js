const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('../Utils');
const axios = require('axios');


let info = {
    name: 'Jayda Slater',
    email: 'j.s@mcgill.ca',
    password: 'sedwSD12312232',
    address: {
        street: '3455 Do Street',
        city:  'Montreal',
        zip: 'H2TT9H'
    }
}

let owner = {
    name: 'owner',
    email: 'owner1@gmail.com',
    password: 'sedwS12312232',
    address: {
        street: '3455 Do Street',
        city:  'Montreal',
        zip: 'H2TT9H'
    }
}

let restaurant_temp = {
    name: 'shitang',
    address: {
        "street": "2200 Boul de Masionneuve",
        "city": "montreal",
        "zip": "H3H1M6"
    }
}

const sample_menu_item = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
};

let createdOrders = [];
let restaurantId = '';
let token = ''
let orderTable = {};
let foundOrders = [];
Given('George Cullen is logged in as a restaurant owner and owns a restaurant George1', async function () {
    owner.name = 'George Cullen';
    restaurant_temp.name = 'George1';
    let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});
    await client.assert.equal(res.status, 201);
    await client.assert.equal(res.data.restaurants.length, 1);
    restaurantId  = res.data.restaurants[0];
    res = await utils.loginRestaurantOwner({email:owner.email, password:owner.password});
    await client.assert.equal(res.status, 200);
    await client.assert.not.equal(res.data.token, '');
    token = res.data.token;
});


Given('George1 has the following orders', async function (data) {
    orderTable = {};

    //add a new menu item
    let itemRes = await utils.addMenuItem(restaurantId, {'Authorization':`Bearer ${token}`, 'email': owner.email}, sample_menu_item);
    await client.assert.equal(itemRes.status, 201);
    await client.assert.equal(itemRes.data.menuitems.length, 1)
    let items = itemRes.data.menuitems;
    let res = await utils.signupCustomer(info);
    await client.assert.equal(res.status, 201);
    let customer = res.data;

    let tables = data.hashes();
    for(var i = 0; i < tables.length; i++){
        var table = tables[i];
        var orderId = table.orderId;
        let res = await utils.createOrder(token, {
            customerId: customer['_id'],
            restaurantId: restaurantId,
            order_items: items
        });
        await client.assert.equal(res.status, 201);
        await client.assert.not.equal(res.data['_id'], '');
        
        orderTable[table.orderId] = res.data['_id'];
        res = await utils.updateStatus(token, {orderId: orderTable[orderId], status: table.status.toUpperCase()});
        await client.assert.equal(res.status, 201);
    }
});

When('George Cullen requests to view all the orders in queue', async function () {
// Write code here that turns the phrase above into concrete actions
    let res = await axios.get('http://localhost:5000/restaurant/getCurrentOrders?restaurantId='+restaurantId,{
        headers:{'Authorization':`Bearer ${token}`}
    });
    await client.assert.equal(res.status, 200);
    foundOrders = res.data.map((item)=>item._id);
});

Then('the following items are returned for view orders', async function (data) {
// Write code here that turns the phrase above into concrete actions
    let tables = data.hashes();
    for(let i = 0; i < tables.length; i++){
        let orderId = tables[i].orderId;
        console.log('orders should contain orderId');
        await client.assert.ok(foundOrders.includes(orderTable[orderId]));
    }
});

// error flow not implemented
Given('NonUser is not logged into the system for view all orders', async function () {
// Write code here that turns the phrase above into concrete actions
});


When('NonUser requests requests to view all the orders in queue for view all orders', async function () {
// Write code here that turns the phrase above into concrete actions
});

Then('A {string} Message is issued for view all orders', async function (string) {
// Write code here that turns the phrase above into concrete actions
});



