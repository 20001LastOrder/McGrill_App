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

Given(/^Jayda Slater is logged into as a customer for order$/, async() =>  {
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
});

Given(/^the following restaurants exists in the system for order$/, async(data) =>  {
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
});

Given(/^the following food item exists in the system for order$/, async(data) =>  {
    let tables = data.hashes();
    for(let i = 0; i < owners.length; i++){
        let owner = owners[i];
        let res = await utils.loginRestaurantOwner({email: owner.email, password: owner.password});
        await client.assert.equal(res.status, 200);
        await client.assert.not.equal(res.data.token, '');

        //post menu items
        for(let j = 0; j < tables.length; j ++){
            let table = tables[j];
            let resName = Object.keys(restaurant_tables)[i];
            if(table.restaurant === resName){
                sample_menu_item.name = table.itemName;
                let itemRes = await utils.addMenuItem(owner.restaurants[0], {'Authorization':`Bearer ${res.data.token}`, 'email': owner.email}, sample_menu_item);
                await client.assert.equal(itemRes.status, 201);
                await client.assert.equal(itemRes.data.name, resName);
                await client.assert.not.equal(itemRes.data.menuitems[itemRes.data.menuitems.length-1], '');
                menu_items[table.itemName + resName] = {item: itemRes.data.menuitems[itemRes.data.menuitems.length-1], restaurant: restaurant_tables[resName]};
            }
        }
    }
});

Given(/^the following items are in the cart of Jayda Slater for order$/, async(data) =>  {
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
});

Given(/^Jayda Slater add a new menu item to the cart for order$/, async(data) =>  {
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
});

When(/^Jayda Slater requests to submit the items in cart for order$/, async() =>  {
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

Then(/^an order is created and the status is pending for order$/, async() =>  {
    //check the length of the orders
    await client.assert.equal(createdOrders.length, 1);
    for(let i = 0; i < Object.keys(order).length; i++){
        let restaurant = Object.keys(order)[i];
        let items = order[restaurant];
        checkOrders(createdOrders[i], restaurant, items);
    }

});

Then(/^Two orders are created and the status is pending for order$/, async() =>  {
    await client.assert.equal(createdOrders.length, 2);
    for(let i = 0; i < Object.keys(order).length; i++){
        let restaurant = Object.keys(order)[i];
        let items = order[restaurant];
        checkOrders(createdOrders[i], restaurant, items);
    }
});

async function checkOrders(order, restaurant, items){
    await client.assert.equal(order.restaurantId, restaurant);
    await client.assert.equal(order.customerId, customer['_id']);
    for(var i = 0; i < order.order_items.length; i++){
        await client.assert.equal(order.order_items[i]['_id'], items[i]);
    }
    await client.assert.equal(order.price, items.length * sample_menu_item.price);
}

//ignore error flow
Given(/^NonUser is not logged into the system for order$/, async() =>  {
});

When(/^NonUser requests to submit the items in cart for order$/, async() =>  {
});


Then(/^A \"([^\"]*)\" Message is issued for order$/, async (pleaselogin) => {
});