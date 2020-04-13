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

let sample_menu_item2 = {
    "name" : "test_menu",
    "description" : "test_desc",
    "price": 123,
    "sold_out": false,
    "stock": 12,
};

let restaurant = '';
let token = '';
let itemRes = undefined;
Given(/^user R is logged in as a restaurant owner$/, async ()=>{
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
  
When(/^the item with the item number of I000001 is requested to be removed$/, async ()=>{
    itemRes = await utils.addMenuItem(restaurant, {'Authorization':`Bearer ${token}`, 'email': owner.email}, sample_menu_item);
    await client.assert.equal(itemRes.status, 201);
});
  
When(/^the items with the item number of I000001 and I000002 are requested to be removed at the same time$/, async ()=>{
    itemRes = await utils.addMenuItem(restaurant, {'Authorization':`Bearer ${token}`, 'email': owner.email}, sample_menu_item2);
    await client.assert.equal(itemRes.status, 201);
});
  

Then(/^the item I000001 is removed from the list$/, async ()=>{
    await client.assert.equal(itemRes.data.menuitems.length, 1)
});
  
Then(/^the item I000001 and item I000002 is removed from the list$/, async ()=>{
    await client.assert.equal(itemRes.data.menuitems.length, 1)
});


// error cases
When(/^the item with the item number of I00000Invalid is requested to be removed$/, async ()=>{
});
  
Then(/^no item is removed from the list$/, async ()=>{
});
  
Then(/^the item list is initialized$/, async ()=>{
});
  
Then(/^The user is notified that the item number is invalid, an \"([^\"]*)\" messge is issued.$/, async (invalidmenuitem)=>{
});