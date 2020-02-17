const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

async function setResOwnInfo(name, email, addr, city, zipcode, ResName, ResAddr, ResCity, ResZip, pass, confirmpass){
    await client.setValue('input[name=name]', name);
    await client.setValue('input[name=email]', email);
    await client.setValue('input[name=city]', city);
    await client.setValue('input[name=addr]', addr);
    await client.setValue('input[name=zipcode]', zipcode);
    await client.setValue('input[name=ResName]', ResName);
    await client.setValue('input[name=ResAddr]', ResAddr);
    await client.setValue('input[name=ResCity]', ResCity);
    await client.setValue('input[name=ResZip]', ResZip);
    await client.setValue('input[name=password]', pass);
    await client.setValue('input[name=confirm_password]', confirmpass);
}


Given(/^Restaurant owner (.+) with email address (.+), address (.+) (.+) (.+), restaurant (.+), restaurant address (.+) (.+) (.+), password (.+)$/, async (name, email, addr, city, zip, restname, restaddr, rescity, reszip, pass)=> {
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    await setResOwnInfo(name, email, addr, city, zip, restname, restaddr, rescity, reszip, pass, pass);
});

Given(/^Restaurant owner (.+) with email address (.+), address (.+) (.+) (.+), restaurant (.+), restaurant address (.+) (.+) (.+), password (.+)$/, async (name, email, addr, city, zip, restname, restaddr, rescity, reszip, pass)=>{
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    await setResOwnInfo(name, email, addr, city, zip, restname, restaddr, rescity, reszip, pass, pass);
});
  
Given(/^Restaurant owner Bryson Lindsey with email address b.lin@outlook.com, address 3444 Rue Sherbrook, city Montreal, zip H2E3X4, restaurant RVC Cafeteria, restaurant address 3231 University, city Montreal, zip H2E3X1$/, async () => {
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    await setResOwnInfo('Bryson Lindsey', 'b.lin@outlook.com', '3444 Rue Sherbrook', 'Montreal', 'H2E3X4', 'RVC Cafeteria', '3231 University', 'Montreal', 'H2E3X1', 'passWord@333', 'passWord@333');

});
  
When(/^requests to create a restaurant$/, async () =>{
    await client.click('input[type=submit]');
    await client.pause(1000);
});
  
When(/^A restaurant owner account with retaurant name RVC Cafeteria and email b.lin@outlook.com exists in the system$/, async () =>{
    await setResOwnInfo('Bryson Lindsey', 'b.lin@outlook.com', '3444 Rue Sherbrook', 'Montreal', 'H2E3X4', 'RVC Cafeteria', '3231 University', 'Montreal', 'H2E3X1', 'passWord@333', 'passWord@333');
    await client.click('input[type=submit]');
    await client.pause(1000);
    await client.click('li[title=Logout]');
});
  
  
Then(/^Restaurant owner (.+) with email address (.+), address (.+) (.+) (.+), restaurant (.+), restaurant address (.+) (.+) (.+), password (.+)$/, async()=> {
    await client.expect.element('li[title=Logout]').to.be.visible;
});
  
Then(/^a message \"([^\"]*)\" is issued$/, async (somefieldsaremissing) =>{
    return client.getAlertText((result)=>{
        client.assert.equal(result.value, message);
        client.acceptAlert();
    });
});