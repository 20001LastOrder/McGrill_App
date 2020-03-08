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
    email: '',
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

let owners = [];
let restaurant_tables = {};
let menu_items = {};
let order = {};
let customer = {};
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

    owners = []
    restaurant_tables = {};
    menu_items = {};
    let tables = data.hashes()
    for(let i = 0; i < tables.length; i++){
        owner.email = `owner${i}@gmail.com`;
        restaurant_temp.name = tables[i].name;
        let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});
        //replace the password with real password
        res.data.password = owner.password;
        owners.push(res.data);
        restaurant_tables[restaurant_temp.name] = res.data.restaurants[0];
        await client.assert.equal(res.status, 201);
    }

    order = {};
    let tables = data.hashes();
    for(let i = 0; i < tables.length; i++){
        let table = tables[i]
        let item = menu_items[table.itemName + table.restaurant];
        if(order[item.restaurant] === undefined){
            order[item.restaurant] = [item.item];
        }else{
            order[item.restaurant].push(item.item);
        }
    }
    await client.assert.equal(Object.keys(order).length, 1)

    let tables = data.hashes();
    for(let i = 0; i < tables.length; i++){
        let table = tables[i]
        let item = menu_items[table.itemName + table.restaurant];
        if(order[item.restaurant] === undefined){
            order[item.restaurant] = [item.item];
        }else{
            order[item.restaurant].push(item.item);
        }
    }
    await client.assert.equal(Object.keys(order).length, 2)

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

    //check the length of the orders
    await client.assert.equal(createdOrders.length, 1);
    for(let i = 0; i < Object.keys(order).length; i++){
        let restaurant = Object.keys(order)[i];
        let items = order[restaurant];
        checkOrders(createdOrders[i], restaurant, items);
    }

    //request view order
});

async function checkOrders(order, restaurant, items){
    await client.assert.equal(order.restaurantId, restaurant);
    await client.assert.equal(order.customerId, customer['_id']);
    for(var i = 0; i < order.order_items.length; i++){
        await client.assert.equal(order.order_items[i]['_id'], items[i]);
    }
    await client.assert.equal(order.price, items.length * sample_menu_item.price);
}

Then(/^the following items are returned$/, async(data)=> {
    const response = await axios.get('http://localhost:5000/order/all');
    res = response;
});

//ignore error case

When(/^NonUser requests requests to view all the orders in queue$/, async()=> {
    
});