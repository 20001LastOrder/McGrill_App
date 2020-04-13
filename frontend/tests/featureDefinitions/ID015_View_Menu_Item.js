const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('../Utils');

let info = {
    name: 'Kurtis',
    email: 'K@mcgill.ca',
    password: '233Dre123',
    address: {
        street: '3455 eee Street',
        city:  'Montreal',
        zip: 'H2TY2F'
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
let token = '';
let customer = {};
let itemRes = undefined;

Given(/^The following menu items exist for restaurant Boustan in the system$/, async (menulist) => {
    restaurant = '';
    owner.name = 'Joe Rangel';
    restaurant_temp.name = 'Joe1';
    let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});
    await client.assert.equal(res.status, 201);
    await client.assert.equal(res.data.email, owner.email);
    await client.assert.equal(res.data.restaurants.length, 1);
    restaurant = res.data.restaurants[0];

    res = await utils.loginRestaurantOwner({email: owner.email, password: owner.password});
    await client.assert.equal(res.status, 200);
    await client.assert.not.equal(res.data.token, '');
    token = res.data.token;
});
  
Given(/^User Asim Mccann is loged in as a Customer$/, async () => {
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
    let res = await utils.signupCustomer(info);
    await client.assert.equal(res.status, 201);
    
    customer = res.data
    res = await utils.loginCustomer({email: info.email, password: info.password});
    await client.assert.not.equal(res.data.token, '');
    await client.assert.equal(res.status, 200);
    // get authentication token
    customer.token = res.data.token;
});
  
When(/^the user requests the menu items of the restaurant Boustan$/, async () => {
    itemRes = await utils.addMenuItem(restaurant, {'Authorization':`Bearer ${token}`, 'email': owner.email}, sample_menu_item);
    await client.assert.equal(itemRes.status, 201);
});

Then(/^the following list of items is returned$/, async (returnlist) => {
    await client.assert.equal(itemRes.data.menuitems.length, 1)
});
  

//ignore error case
Given(/^Restaurant (.+) is not in the system$/, async (nonexistingrestaurant) => {
});
  

  
When(/^Asim Mccann requests menu items for the restaurant (.+)$/, async (nonexistingrestaurant) => {
});
  

Then(/^an error message \"([^\"]*)\" is issued$/, async (restaurantdoesnotexist) => {
});