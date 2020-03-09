const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^the system is on the page of menu page and logged in as Kurtis$/, async()=> {
    await client.url('http://localhost:3000/menu').waitForElementVisible('body', 2000);
});

When(/^Kurtis add a burger into the cart$/, async()=> {
    await client.click('button[id = plus0]')
});

When(/^Kurtis add two fries into the cart$/, async()=> {
    await client.click('button[id = plus1]')
    await client.click('button[id = plus1]')
});

Then(/^one burger should be listed in the cart$/, async()=> {
    await client.click('button[id = cartPic]')
    await client.expect.element('li[id=burger]').to.be.present;
});

Then(/^two fries are listed in the cart$/, async()=> {
    await client.click('button[id = cartPic]')
    await client.expect.element('li[id=fries]').to.be.visible;
});



//ignore error case
