const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^the system is on the page of Tim Hortons and logged in as Kurtis$/, async()=> {
    await client.url('http://localhost:3000/user/menu').waitForElementVisible('body', 2000);
});

Given(/^Tim Hortons provides following items$/, async()=> {
    
});

When(/^Kurtis add a burger into the cart$/, async()=> {
    
});

When(/^Kurtis add two fries into the cart$/, async()=> {
    
});

Then(/^one burger should be listed in the cart$/, async()=> {
    
});

Then(/^two fries are listed in the cart$/, async()=> {
    
});



//ignore error case
