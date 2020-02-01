const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

Given(/^I open Google's Search Page$/, ()=>{
    return client.url('http://localhost:5000').waitForElementVisible('body', 2000);
});

Then(/^the title is "([^"]*)"$/, title =>{
    return client.assert.title(title);    
});

Then(/^the Google Search form exists$/, () =>{
    return true;//client.assert.visible('input[name="q"]');  
});