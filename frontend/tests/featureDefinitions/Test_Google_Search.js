const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

Given(/^I open Google's Search Page$/, ()=>{
    return client.url('http://google.com').waitForElementVisible('body', 1000);
});

Then(/^the title is "([^"]*)"$/, title =>{
    return client.assert.title(title);    
});

Then(/^the Google Search form exists$/, () =>{
    return client.assert.visible('input[name="q"]');  
});