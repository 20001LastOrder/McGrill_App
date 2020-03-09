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

let owners = [];
let restaurant_tables = {};
let customer = {};
let restaurant = [];

Given(/^Kurtis is logged in as customer$/, async()=> {
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

Given(/^the following restaurants exist in the system for search$/, async(data) =>  {
    owners = []
    restaurant_tables = {};
    let tables = data.hashes()


    for(let i = 0; i < tables.length; i++){
        owner.email = `owner${i}@gmail.com`;
        restaurant_temp.name = tables[i].restaurant;
        let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});

        await client.assert.equal(res.status, 201);
        //replace the password with real password
        res.data.password = owner.password;
        owners.push(res.data);
        restaurant_tables[restaurant_temp.name] = res.data.restaurants[0];
    }

});

When(/^Kurtis searches for Boustan$/, async()=> {  
    let res = await utils.searchRestaurant(customer.token,restaurant_tables['Boustan']);
    await client.assert.equal(res.status, 200);
    restaurant = res.data;
});


Then(/^the restaurant Boustan should be listed for search$/, async()=> {
    await client.assert.equal(restaurant.name, 'Boustan');
    await client.assert.equal(restaurant.address.city.toLowerCase, restaurant_temp.address.city.toLowerCase);
    await client.assert.equal(restaurant.address.street.toLowerCase, restaurant_temp.address.street.toLowerCase);
    await client.assert.equal(restaurant.address.zip.toLowerCase, restaurant_temp.address.zip.toLowerCase);
});
  
//ignore error case
When(/^Kurtis searches for KFC$/, async()=> {
    
});

Then(/^no restaurant should be listed$/, async()=> {
    
});
