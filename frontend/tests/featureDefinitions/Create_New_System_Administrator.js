const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
const axios = require('axios');

let info = {
    name: '',
    email: '',
    employeeid: '',
    password: '',
    address: {
        street: '',
        city:  '',
        zip: ''
    }
}

let res = {}

Given(/^Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is a McGill University administrator with good standing$/, async () => {
    await client.url('http://localhost:3000/owner/signup').waitForElementVisible('body', 2000);
    info.email = 'liya.nelson@mcgill.ca';
    info.employeeid = 'em001';
    info.password = 'liyaNelson001';
    info.name = 'Liya Nelson';
    info.address.street = '1232 dihnsme Street';
    info.address.city = 'Montreal';
    info.address.zip = "H2X3X2";
    await client.assert.equal(info.email, 'liya.nelson@mcgill.ca');
});
  

When(/^Liya Nelson requests to create the system administration account$/, async () => {
    const response = await axios.post('http://localhost:5000/admin/signup', info);
    res = response;
});
  
Then(/^an user with name Liya Nelson and email liya.nelson@mcgill.com is created, a password liyaNelson001 is created$/,async () => {
    await client.assert.equal("Admin", res.data['__t']);
    await client.assert.equal(info.email, res.data.email)
    await client.assert.equal(info.name, res.data.name);
});

//ignore error flow
Given(/^Amman Sumner with employee id INVALID_ID$/, () => {
});

When(/^Amman Sumner requests to create the system administration account$/, () => {
});

Given(/^Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is an administrator of the system$/, () => {
});

Then(/^an \"([^\"]*)\" error is issued.$/, (invalidemployeeid)=>{
});