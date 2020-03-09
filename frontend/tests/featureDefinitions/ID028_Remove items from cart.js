const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^the system has restaurant Tim Hortons and logged in as Kurtis$/, async()=> {
    await client.url('http://localhost:3000/menu').waitForElementVisible('body', 2000);
});

When(/^Kurtis remove a burger from the cart$/, async()=> {
    await client.click('button[id = addCart]')
    await client.click('button[id = cartPic]')
    await client.click('i[id = burger-minus]')
});

Then(/^the cart should only have one fries left$/, async()=> {
    await client.expect.element('li[id=fries]').to.be.visible;
    await client.expect.element('li[id=burger]').to.be.not.present;

});


Given(/^the cart of Kurtis already has one double double and two crispy chicken wrap$/, async()=> {
    await client.click('button[id = plus0]')
    await client.click('button[id = plus1]')
});

//ignore error case
