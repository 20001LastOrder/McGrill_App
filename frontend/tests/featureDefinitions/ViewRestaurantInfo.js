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
Given(/^A user name Tom is in the system and is loged in (Normal Flow)$/, async () =>{

});

When(/^The User Tom requests the details for \"([^\"]*)\"$/, async (restaurant) =>{

});

When(/^The User Tom requests for a restaurant named \"([^\"]*)\"$/, async (nonexistingrestaurant) => {

});

Then(/^A restaurant information containing \"([^\"]*)\", \"([^\"]*)\", \"([^\"]*)\" and \"([^\"]*)\" is generated$/, async (restaurant, closinghours, cuisinetype,  openinghours) => {

});

Then(/^A \"([^\"]*)\" message is issued$/, async (nonexistingrestaurant) =>{

});

Then(/^The following restaurants exist in the system$/, async () => {

});
