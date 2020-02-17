const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

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
Given(/^an account with email \"([^\"]*)\" and password \"([^\"]*)\" is already created in the system$/, async(email, password) => {
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    // add a person
    await setUserInfo('tyclany', email, 'street', 'city', 'zip', password);
    await client.click('input[type=submit]');
    await client.expect.element('li[title=Logout]').to.be.visible;
    await client.click('li[title=Logout]');
});
  
Given(/^there is no user with email noemail@gmail.com$/, async () =>{
    
});
  
When(/^the user provide email is \"([^\"]*)\" and password is \"([^\"]*)\" for login$/, async (email, password) => {
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
    await loginInfo(email,password);
});

When(/^the user requests to login$/, async () => {
    await client.click('button[name=Login]');
    await client.pause(1000);
});
  
Then(/^the user shall be successfully logged into the system$/, async () => {
    await client.expect.element('li[title=Logout]').to.be.visible;
    await client.click('li[title=Logout]');
});
  
Then(/^the user shall not be logged into the system$/, async () => {
    await client.expect.element('li[title=Logout]').to.be.not.present;
});