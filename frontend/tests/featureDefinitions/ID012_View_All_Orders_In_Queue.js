const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('./Utils');
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


When(/^Joe Rangel requests to view all the orders in queue$/, async()=> {
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
    let res = await utils.signupCustomer(info);
    await client.assert.equal(res.status, 201);
    // get customer infomation 
    customer = res.data
    res = await utils.loginCustomer({email: info.email, password: info.password});
    await client.assert.not.equal(res.data.token, '');
    await client.assert.equal(res.status, 200);
    // get authentication token
    customer.token = res.data.token;

    let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});
    //replace the password with real password
    res.data.password = owner.password;
    await client.assert.equal(res.status, 201);

    
    let res = await utils.loginRestaurantOwner({email: owner.email, password: owner.password});
    await client.assert.equal(res.status, 200);
    await client.assert.not.equal(res.data.token, '');
    //post menu items
    let itemRes = await utils.addMenuItem(owner.restaurants[0], {'Authorization':`Bearer ${res.data.token}`, 'email': owner.email}, sample_menu_item);
    await client.assert.equal(itemRes.status, 201);
    await client.assert.equal(itemRes.data.name, resName);
    
    createdOrders = [];
    for(let i = 0; i < Object.keys(order).length; i++){
        let restaurant = Object.keys(order)[i];
        let items = order[restaurant];
        let res = await utils.createOrder(customer.token, {
            customerId: customer['_id'],
            restaurantId: restaurant,
            order_items: items
        });
        await client.assert.equal(res.status, 201);

        // add the created order for later check
        createdOrders.push(res.data);
    }

});



Then(/^the following items are returned$/, async(data)=> {
    const response = await axios.get('http://localhost:5000/order/all');
    res = response;
});

//ignore error case

When(/^NonUser requests requests to view all the orders in queue$/, async()=> {
    
});