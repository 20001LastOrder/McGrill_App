const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^Amman Sumner with email address amman.sumner@mail.mcgill.ca exists the McGrill system$/, async (memname, email, street, city, zip, password) => {

});

Given(/^Marcel Whitehead with email address marcel.white@mcgill.com is not in the system$/, async (memname, email, street, city, zip, password) => {

});

When(/^Amman Sumner with email address amman.sumner@mail.mcgill.ca requests to remove the account$/, async (memname, email, street, city, zip, password) => {

});

When(/^Marcel Whitehead requests to remove the account with email marcel.white@mcgill.com$/, async (memname, email, street, city, zip, password) => {

});

Then(/^User Amman Sumner with email address amman.sumner@mail.mcgill.ca is completely removed from the McGrill system, along with the account information$/, async (memname, email, street, city, zip, password) => {

});

Then(/^an \"([^\"]*)\" message is issued.$/, function (userdoesnotexist, callback) {

});
  
