const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const utils = require('./Utils');

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

let info = {
    name: '',
    email: '',
    password: '',
    address: {
        street: '3455 Do Street',
        city:  'Montreal',
        zip: 'H2TT9H'
    }
}

let restaurant = {
    name: 'shitang',
    address: {
        "street": "2200 Boul de Masionneuve",
        "city": "montreal",
        "zip": "H3H1M6"
    }
}

Given(/^user (.+) of user type (.+) with email (.+), password (.+) is registered in the McGrill Application System$/, async (username, usertype, email, password) =>{
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
    let res = {};
    info.name = username;
    info.email = email;
    info.password = password;
    if(usertype === 'Customer'){
        res = await utils.signupCustomer(info);
    }else if(usertype === 'Owner'){
        res = await utils.signupRestaurantOwner({owner: info, restaurant: restaurant});
    }else if(usertype === 'Administrator'){
        info.employeeid = 'em001';
        res = await utils.signupAdministrator(info);
    }
    await client.assert.equal(res.status, 201);
});

Given(/^user (.+) is logged into the McGrill Application$/, async (username) => {
    await client.url('http://localhost:3000/login').waitForElementVisible('body', 2000);
    await loginInfo(info.email, info.password);
    await await client.click('button[name=Login]');
    await client.pause(1000);
    await client.expect.element('li[title=Logout]').to.be.visible;
});

When(/^user (.+) requests to view their user profile$/, async (username) => {
    await client.url('http://localhost:3000/profilesettings').waitForElementVisible('input[id=name]', 4000);
    await client.pause(2000);
});
  

  
Then(/^user (.+) should get the profile containing (.+), (.+)$/, async (username, usertype, email) => {
    //await client.expect.element('input[id=name]').value.to.equal(info.name);
    await client.expect.element('input[id=email]').value.to.equal(info.email);
    await client.expect.element('input[id=street]').value.to.equal(info.address.street.toLowerCase());
    await client.expect.element('input[id=city]').value.to.equal(info.address.city.toLowerCase());
    await client.expect.element('input[id=zipcode]').value.to.equal(info.address.zip.toLowerCase());
    await client.click('li[title=Logout]');
});

// Error flow ignored
  
Then(/^a \"([^\"]*)\" view profile error message is issued$/, async (memname) => {

});

Given(/^The user has the McGrill Application open on their device$/, async () => {

});
When(/^The user requests to view their user profile$/, async () => {

});
  
