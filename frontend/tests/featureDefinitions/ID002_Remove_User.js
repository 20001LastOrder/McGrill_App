const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const axios = require('axios');
const utils = require('../Utils');

let info = {
    name: '',
    email: '',
    password: '',
    address: {
        street: '',
        city:  '',
        zip: ''
    }
}

Given(/^Amman Sumner with email address amman.sumner@mail.mcgill.ca exists the McGrill system$/, async () => {
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    info.name = 'Amman Sumner';
    info.email = 'amman.sumner@mail.mcgill.ca';
    info.password = 'aaBBcc1122';
    info.address = {
        street: '12345 dasif street',
        city: 'Montreal',
        zip: 'H2A2R1'
    }

    let res = await utils.signupCustomer(info);
    await client.assert.equal(res.status, 201);
    await client.assert.equal(res.data.email, info.email);
});

When(/^Amman Sumner with email address amman.sumner@mail.mcgill.ca requests to remove the account$/, async () => {
    let res = await utils.loginCustomer({email: info.email, password: info.password});
    await client.assert.equal(res.status, 200);
    await client.assert.not.equal(res.data.token, '');
    let deleteRes = await utils.deleteUser({email: info.email, Authorization: `Bearer ${res.data.token}`});
    await client.assert.equal(deleteRes.status, 200);
    await client.assert.equal(deleteRes.data.email, info.email);
});



Then(/^User Amman Sumner with email address amman.sumner@mail.mcgill.ca is completely removed from the McGrill system, along with the account information$/, async () => {
    try{
        let res = await utils.loginCustomer({email: info.email, password: info.password});
        await client.assert.equal(res.status, 400);
    }catch(e){
        await client.assert.equal(e.response.status, 400);
    }
});

// Errror flow not tested
Given(/^Marcel Whitehead with email address marcel.white@mcgill.com is not in the system$/,() => {

});

When(/^Marcel Whitehead requests to remove the account with email marcel.white@mcgill.com$/,() => {

});

Then(/^an \"([^\"]*)\" message is issued.$/, (arg) =>{

});
  
