const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^the system is on the page of menu page and logged in as Yiin to view order$/, async()=> {
  await client.url('http://localhost:3000/menu').waitForElementVisible('body', 2000);
});

Given(/^Yiin add a burger into the cart$/, async()=> {
  await client.click('button[id = plus0]')
});

Given(/^Yiin add two fries into the cart$/, async()=> {
  await client.click('button[id = plus1]')
  await client.click('button[id = plus1]')
});

When(/^Yiin requests to view the cart$/, async()=> {
  await client.click('button[id = cartPic]')
});

Then('one burger should be listed', async() => {
  await client.expect.element('li[id=burger]').to.be.present;
});

Then('two fries are listed', async() => {
  await client.expect.element('li[id=fries]').to.be.visible;
});
