const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('./Utils');

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
    email: 'j.r@gmail.com',
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

let sample_menu_item = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
};

let restaurant = '';
let orderTable = {};
let token = '';
let updatedOrder = undefined;

Given(/^Joe Rangel is logged in as a restaurant owner and owns a restaurant Joe1$/, async()=> {
    restaurant = '';
    owner.name = 'Joe Rangel';
    restaurant_temp.name = 'Joe1';
    let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});
    await client.assert.equal(res.status, 201);
    await client.assert.equal(res.data.email, owner.email);
    await client.assert.equal(res.data.restaurants.length, 1);
    restaurant = res.data.restaurants[0];
});

Given(/^Joe1 has the following orders$/, async(data)=> {
    orderTable = {};
    let res = await utils.loginRestaurantOwner({email: owner.email, password: owner.password});
    await client.assert.equal(res.status, 200);
    await client.assert.not.equal(res.data.token, '');
    token = res.data.token;
    //add a new menu item
    let itemRes = await utils.addMenuItem(restaurant, {'Authorization':`Bearer ${token}`, 'email': owner.email}, sample_menu_item);
    await client.assert.equal(itemRes.status, 201);
    await client.assert.equal(itemRes.data.menuitems.length, 1)
    let items = itemRes.data.menuitems;
    res = await utils.signupCustomer(info);
    await client.assert.equal(res.status, 201);
    let customer = res.data;

    let tables = data.hashes();
    for(var i = 0; i < tables.length; i++){
        var table = tables[i];
        
        let res = await utils.createOrder(token, {
            customerId: customer['_id'],
            restaurantId: restaurant,
            order_items: items
        });
        await client.assert.equal(res.status, 201);
        await client.assert.not.equal(res.data['_id'], '');
        await client.assert.equal(res.data.status.toLowerCase(), table.status);
        orderTable[table.orderId] = res.data['_id'];
    }
});

Given(/^order 1111 is not complete$/, ()=> {

});

When(/^Joe Rangel request to change the status of the order (.+) to (.+)$/, async(orderId, status)=> {
    let res = await utils.updateStatus(token, {orderId: orderTable[orderId], status: status});
    await client.assert.equal(res.status, 201);
    updatedOrder = res.data;
});

Then(/^the status of (.+) changes to (.+)$/, async (orderId, newstatus) => {
    console.error(orderId);
    await client.assert.equal(updatedOrder['_id'], orderTable[parseInt(orderId)]);
    await client.assert.equal(updatedOrder.status, newstatus);
});

//ignore error case
Given(/^order 1111 is complete$/, ()=> {

});


When(/^NonUser requests change the status of order 1111$/,  () => {

});