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
Given(/^An account with email yin.zhang@mail.mcgiil.ca and password 12Wdasew1w2 is already created in the system$/, async() => {
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    // add a person
    await setUserInfo('tyclany', 'yin.zhang@mail.mcgiil.ca', 'street', 'city', 'zip', '12Wdasew1w2');
});
  
Given(/^There is no user with email noemail@gmail.com$/, async () =>{

});
  
When(/^The user requests to login$/, async () => {
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
});
  
When(/^An user requests to login$/, async () => {
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
});
  
Then(/^the user shall be successfully logged into the system$/, async () => {
    await client.expect.element('li[title=signup]').to.be.visible;
});
  
Then(/^the user shall not be logged into the system$/, async () => {
    await client.expect.element('buttom[name=login]').to.be.visible;
});
  
When(/^email is yin.zhang@mail.mcgiil.ca and password is 12Wdasew1w2$/, async () => {
    await loginInfo('yin.zhang@mail.mcgiil.ca','12Wdasew1w2');
    await client.click('input[type=login]');
    await client.pause(1000);
});

When(/^the email is yin.zhang@mail.mcgiil.ca$/, async () => {
    await loginInfo('noemail@gmail.com','ttttt');
    await client.click('input[type=login]');
    await client.pause(1000);
});
  
Then(/^A \"([^\"]*)\" message is issued$/, (message)=> {
    return client.getAlertText((result)=>{
        client.assert.equal(result.value, message);
        client.acceptAlert();
    });
});
  
When(/^email is yin.zhang@mail.mcgiil.ca and password is WRONG_EMAIL$/, async () => {
    await loginInfo('yin.zhang@mail.mcgiil.ca','12Wdasew1w2');
    await client.click('input[type=login]');
    await client.pause(1000);
});