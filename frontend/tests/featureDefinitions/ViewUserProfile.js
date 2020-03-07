const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const axios = require('axios');

async function setUserInfo(memname, email, street, city, zip, password){
    await client.setValue('input[name=name]', memname);
    await client.setValue('input[name=email]', email);
    await client.setValue('input[name=street]', street);
    await client.setValue('input[name=city]', city);
    await client.setValue('input[name=zipcode]', zip);
    await client.setValue('input[name=password]', password);
    await client.setValue('input[name=confirm_password]', password);
  }

async function loginInfo(email,password){
    await client.setValue('input[name = email]',email);
    await client.setValue('input[name = password]', password);
}

var info = {
    email: 'yzhang666@178.com',
    password: 'tyclany'
}

Given(/^user (.+) of user type (.+) with email (.+), password (.+) is registered in the McGrill Application System$/, async (username, usertype, email, password) =>{
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    // add a person
    await setUserInfo('Abcd Slater', 'yzhang666@178.com', '2223 tttfs Street', 'Montreal', 'H2D3XF', 'tyclany');
    await client.click('input[type=submit]')
    // await client.url('http://localhost:3000/user/login').waitForElementVisible('body', 2000);
    // await loginInfo('yzhang555@178.com', 'tyclany')
    await client.pause(1000);
    await client.expect.element('li[title=Logout]').to.be.visible;
    await client.click('li[title=Logout]');
    await client.pause(500);
});
  
Given(/^The user has the McGrill Application open on their device$/, async () => {

});
  
When(/^user (.+) requests to view their user profile$/, async (username) => {
    const response = await axios.post('http://localhost:5000/user/login', info);
    res = response;
});
  
When(/^The user requests to view their user profile$/, async () => {

});
  
Then(/^user (.+) should get the profile containing (.+), (.+) and (.+)$/, async (username, usertime, email, address) => {

});
  
Then(/^a \"([^\"]*)\" error message is issued$/, async (memname) => {

});
  
Then(/^user (.+) is logged into the McGrill Application$/, async (username) => {

});