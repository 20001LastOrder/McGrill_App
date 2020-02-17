const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is a McGill University administrator with good standing$/, async () => {
});
  
Given(/^Amman Sumner with employee id INVALID_ID$/, async () => {
});
  
Given(/^Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is an administrator of the system$/, async () => {
});
  
When(/^Liya Nelson requests to create the system administration account$/, async () => {
});
  
When(/^Amman Sumner requests to create the system administration account$/, async () => {
});
  
Then(/^an user with name Liya Nelson and email liya.nelson@mcgill.com is created, a password liyaNelson001 is created$/, async () => {
});
  
Then(/^an \"([^\"]*)\" error is issued.$/, async (invalidemployeeid)=>{
});