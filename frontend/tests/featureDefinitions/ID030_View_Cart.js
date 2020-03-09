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

Given(/^Jayda Slater is logged into the system as a customer$/, async()=> {
  await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
  // await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
  //   // add a person
  // await setUserInfo('Jayda Slater', 'yzhang555@178.com', '2223 tttfs Street', 'Montreal', 'H2D3XF', 'tyclany');
  // await client.click('input[type=submit]')
  // // await client.url('http://localhost:3000/user/login').waitForElementVisible('body', 2000);
  // // await loginInfo('yzhang555@178.com', 'tyclany')
  // await client.pause(1000);
  // await client.expect.element('li[title=Logout]').to.be.visible;
  // await client.click('li[title=Logout]');
  // await client.pause(500);
});

Given(/^the following restaurants exists in the system$/, async(data)=> {
  // await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
  // input = table.rows()
  // for(i = 0 ; i< input.size(); i++){
  //   await setResOwnInfo('tyclany', 'yzhang334@156.com'+[i], '4523 fffd Street', 'Montreal', 'H3X4G5', input[i], '3334 fff Street', 'Montreal', 'G3X3F3', 'tyclany', 'tyclany');
  //   await client.click('input[type=submit]')
  //   await client.pause(1000);
  //   await client.expect.element('li[title=Logout]').to.be.visible;
  //   await client.click('li[title=Logout]');
  //   await client.pause(500);
  // }
});

Given(/^the following food item exists in the system$/, async(data)=> {
  // await client.url('http://localhost:3000/user/login').waitForElementVisible('body', 2000);
  // await loginInfo('yzhang334@156.com', 'tyclany')
});

Given(/^the following items are in the cart of Jayda Slater$/, async(data)=> {
    
});

When(/^Jayda Slater requests to view the cart$/, async()=> {
    
});

Then('the following items are returned', async(data) => {

});

//ignore error case
Given(/^NonUser is not logged into the system$/, async()=> {
    
});

When(/^NonUser requests to view the cart$/, async()=> {
    
});

Then(/^A \"([^\"]*)\" Message is issued$/, async (pleaselogin) => {
    
});
