const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

Given(/^I open login page$/, ()=>{
    return client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
});

Then(/^A login page is shown$/, async () =>{
    await client.assert.containsText('div', 'Username');
    await client.assert.containsText('div', 'password');
});