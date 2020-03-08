const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('../Utils')
async function setResOwnInfo(name, email, street, city, zipcode, restaurant_name, restaurant_street, restaurant_city, restaurant_zipcode, pass, confirmpass){
    await client.setValue('input[name=name]', name);
    await client.setValue('input[name=email]', email);
    await client.setValue('input[name=city]', city);
    await client.setValue('input[name=street]', street);
    await client.setValue('input[name=zipcode]', zipcode);
    await client.setValue('input[name=restaurant_name]', restaurant_name);
    await client.setValue('input[name=restaurant_street]', restaurant_street);
    await client.setValue('input[name=restaurant_city]', restaurant_city);
    await client.setValue('input[name=restaurant_zipcode]', restaurant_zipcode);
    await client.setValue('input[name=password]', pass);
    await client.setValue('input[name=confirm_password]', confirmpass);
}


Given(/^Restaurant owner (.+) with email address (.+), address (.+) (.+) (.+), restaurant (.+), restaurant address (.+) (.+) (.+), password (.+)$/, async (name, email, addr, city, zip, restname, restaddr, rescity, reszip, pass)=> {
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    await setResOwnInfo(name, email, addr, city, zip, restname, restaddr, rescity, reszip, pass, pass);
});
  
Given(/^Restaurant owner Bryson Lindsey with email address b.lin@outlook.com, address 3444 Rue Sherbrook, city Montreal, zip H2E3X4, restaurant RVC Cafeteria, restaurant address 3231 University, city Montreal, zip H2E3X1$/, async () => {
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    await setResOwnInfo('Bryson Lindsey', 'b.lin@outlook.com', '3444 Rue Sherbrook', 'Montreal', 'H2E3X4', 'RVC Cafeteria', '3231 University', 'Montreal', 'H2E3X1', 'passWord@333', 'passWord@333');

});
  
When(/^requests to create a restaurant$/, async () =>{
    await client.click('input[type=submit]');
    await utils.pause(client, 1000);
});
  
When(/^A Restaurant owner Bryson Lindsey with email address b.lin@outlook.com, restaurant RVC Cafeteria, restaurant address 3231 University exists in the system$/, async () =>{
    await setResOwnInfo('Bryson Lindsey', 'b.lin@outlook.com', '3444 Rue Sherbrook', 'Montreal', 'H2E3X4', 'RVC Cafeteria', '3231 University', 'Montreal', 'H2E3X1', 'passWord@333', 'passWord@333');
    await client.click('input[type=submit]');
    await utils.pause(client, 1000);
    await client.click('li[title=Logout]');
});
  
  
Then(/^Restaurant owner (.+) with email address (.+) is created$/, async(name, email)=> {
    await client.expect.element('li[title=Logout]').to.be.visible;
    await client.click('li[title=Logout]');
});

Then('a message {string} is issued', async (string) => {
    // Write code here that turns the phrase above into concrete actions
    
});