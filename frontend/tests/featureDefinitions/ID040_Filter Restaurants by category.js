const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('./Utils');
let info = {
  name: 'Kurtis',
  email: 'K@mcgill.ca',
  password: '233Dre123',
  address: {
      street: '3455 eee Street',
      city:  'Montreal',
      zip: 'H2TY2F'
  }
}

let owner = {
  name: 'owner',
  email: '',
  password: 'sedwS12312232',
  address: {
      street: '3455 Do Street',
      city:  'Montreal',
      zip: 'H2TT9H'
  }
}

let restaurant_temp = {
  name: 'shitang',
  address: {
      "street": "2200 Boul de Masionneuve",
      "city": "montreal",
      "zip": "H3H1M6"
  },
  category: ['Chinese']
}

let owners = [];
let restaurant_tables = {};
let customer = {};
let restaurant = [];

Given(/^Kurtis is logged into the system as a customer for filter restaurant by category$/, async() => {
  //await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
  let res = await utils.signupCustomer(info);
  await client.assert.equal(res.status, 201);
  
  customer = res.data
  res = await utils.loginCustomer({email: info.email, password: info.password});
  await client.assert.not.equal(res.data.token, '');
  await client.assert.equal(res.status, 200);
  // get authentication token
  customer.token = res.data.token;
});

Given (/^The following restaurants exist in the system for filter restaurant by category$/,async(data) =>{
  owners = []
    restaurant_tables = {};
    menu_items = {};
    let tables = data.hashes()
    
    for(let i = 0; i < tables.length; i++){
        owner.email = `owner${i}@gmail.com`;
        restaurant_temp.name = tables[i].restaurant;
        restaurant_temp.category = [tables[i]['Food Category']];
        let res = await utils.signupRestaurantOwner({owner: owner, restaurant: restaurant_temp});
        //replace the password with real password
        res.data.password = owner.password;
        owners.push(res.data);
        //restaurant_tables[restaurant_temp.name] = res.data.restaurants[0];
        restaurant_tables[restaurant_temp.category] = res.data.restaurants[0];
        await client.assert.equal(res.status, 201);
        //console.log(res.data)
    }

});

When(/^Kurtis want to filter Lebanese restaurant$/, async() => {
  let res = await utils.filterByCategory(customer.token,['Lebanese']);
  await client.assert.equal(res.status, 200);
  restaurant = res.data;
  console.log(restaurant)
});

Then(/^the restaurant Boustan should be listed$/, async() => {
  await client.assert.equal(restaurant[0].name, 'Boustan');
  await client.assert.equal(restaurant[0].category[0], 'Lebanese');
});

//ignore error case
When(/^Kurtis wants to filter out Korean restaurant$/, async() => {
});

Then(/^\"([^\"]*)\" is issued$/, async (norestaurantiskoreantype) => {
    
});

