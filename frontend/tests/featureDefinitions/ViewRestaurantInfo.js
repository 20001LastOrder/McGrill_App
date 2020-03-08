const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('../Utils');

async function createOwner(name, email, street, city, zipcode, restaurant_name, restaurant_street, restaurant_city, restaurant_zipcode, pass, confirmpass){
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
    await client.click('input[type=submit]');
    await utils.pause(client, 1000);
    await client.click('li[title=Logout]');
}

Given(/^The following restaurants does not exist in the system$/, (name)=>{

})

When(/^The User Tom requests the details for (.+)$/, async (restaurant) =>{
    await client.url('http://localhost:3000/restaurants/all').waitForElementVisible('body', 2000);
});

Then(/^A restaurant information containing (.+), (.+), (.+) and (.+) is generated$/,async (restaurant, street, city, zip) => {
    await utils.pause(client, 1000);
    await client.expect.element('main[name='+restaurant+']').to.be.visible;
});

Then(/^A restaurant information containing (.+) is not generated$/, (restaurant) =>{
    //await client.expect.element('main[name='+restaurant+']').to.be.not.present;
})

Given(/^A restaurant with (.+), (.+), (.+) and (.+) is in the system$/, async (restaurant, street, city, zip) => {
    await client.url("http://localhost:3000/owner/signup").waitForElementVisible('body', 2000);
    await createOwner('Chen', restaurant+'@mcgill.com', 'street', 'city', 'd2f1s2', restaurant, street, city, zip, 'cD111111', 'cD111111' );
    
});
