const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('./Utils');

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

When(/^Kurtis searches for Boustan$/, async()=> {
    
});

When(/^Kurtis searches for restaurant on Rue Sherbrook$/, async()=> {
    
});

When(/^Kurtis searches for Subway but used sub to search$/, async()=> {
    
});

Then(/^Tim Hortons and Boustan should be listed$/, async()=> {
    
});

Then(/^the restaurant Subway should be listed$/, async()=> {
    
});
  
//ignore error case
When(/^Kurtis searches for KFC$/, async()=> {
    
});

Then(/^no restaurant should be listed$/, async()=> {
    
});
