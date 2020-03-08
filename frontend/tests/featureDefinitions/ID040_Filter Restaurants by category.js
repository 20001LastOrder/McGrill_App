const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
// async function setUserInfo(memname, email, street, city, zip, password){
//     await client.setValue('input[name=name]', memname);
//     await client.setValue('input[name=email]', email);
//     await client.setValue('input[name=street]', street);
//     await client.setValue('input[name=city]', city);
//     await client.setValue('input[name=zipcode]', zip);
//     await client.setValue('input[name=password]', password);
//     await client.setValue('input[name=confirm_password]', password);
//   }
  
  
//   async function loginInfo(email,password){
//     await client.setValue('input[name = email]',email);
//     await client.setValue('input[name = password]', password);
//   }
  
//   async function setResOwnInfo(name, email, street, city, zipcode, restaurant_name, restaurant_street, restaurant_city, restaurant_zipcode, pass, confirmpass){
//     await client.setValue('input[name=name]', name);
//     await client.setValue('input[name=email]', email);
//     await client.setValue('input[name=city]', city);
//     await client.setValue('input[name=street]', street);
//     await client.setValue('input[name=zipcode]', zipcode);
//     await client.setValue('input[name=restaurant_name]', restaurant_name);
//     await client.setValue('input[name=restaurant_street]', restaurant_street);
//     await client.setValue('input[name=restaurant_city]', restaurant_city);
//     await client.setValue('input[name=restaurant_zipcode]', restaurant_zipcode);
//     await client.setValue('input[name=password]', pass);
//     await client.setValue('input[name=confirm_password]', confirmpass);
//   }
//   async function createAndGetRestaurantIdPlusToken () {
//     let obj = {};
//     const res = await request(server)
//         .get('/owner/login')
//         .set('email', owner_normal.owner.email).
//         set('password', owner_normal.owner.password).
//         send();
//     expect(res.statusCode).toEqual(200);
//     obj.restaurant_id = register.body.restaurants[0];
//     obj.user_id = res.body._id;
//     obj.token = res.body.token;
//     obj.email = owner_normal.owner.email;
//     return obj;
// };
Given(/^Kurtis is logged into the system as a customer$/, async() => {
  // await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
  //   // add a person
  // await setUserInfo('Kurtis', 'yzhang555@178.com', '2223 tttfs Street', 'Montreal', 'H2D3XF', 'tyclany');
  // await client.click('input[type=submit]')
  // // await client.url('http://localhost:3000/user/login').waitForElementVisible('body', 2000);
  // // await loginInfo('yzhang555@178.com', 'tyclany')
  // await client.pause(1000);
  // await client.expect.element('li[title=Logout]').to.be.visible;
  // await client.click('li[title=Logout]');
  // await client.pause(500);
});

When(/^Kurtis want to filter Lebanese restaurant$/, async() => {
    
});

When(/^Kurtis wants to filter out sandwiches restaurant$/, async() => {
    
});

Then(/^the restaurant Boustan should be listed$/, async() => {
    
});

Then(/^Subway and super sandwiches should be listed$/, async() => {
    
});

Given(/^The following restaurants exist in the system$/, async(data) => {
    // await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    // input = table.rows()
    // for(i = 0 ; i< input.size(); i++){
    //   await setResOwnInfo('tyclany', 'yzhang334@156.com'+[i], input[i][1], 'Montreal', 'H3X4G5', input[i][0], '3334 fff Street', 'Montreal', 'G3X3F3', 'tyclany', 'tyclany');
    //   await client.click('input[type=submit]')
    //   await client.pause(1000);
    //   await client.expect.element('li[title=Logout]').to.be.visible;
    //   await client.click('li[title=Logout]');
    //   await client.pause(500);
    // }
});

//ignore error case
When(/^Kurtis wants to filter out Korean restaurant$/, async() => {
});

Then(/^\"([^\"]*)\" is issued$/, async (norestaurantiskoreantype) => {
    
});

