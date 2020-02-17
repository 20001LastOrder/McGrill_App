const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^user R is logged in as a restaurant owner$/, async (memname, email, street, city, zip, password)=>{
});
  
When(/^the item with the item number of I000001 is requested to be removed$/, async (memname, email, street, city, zip, password)=>{
});
  
When(/^the items with the item number of I000001 and I000002 are requested to be removed at the same time$/, async (memname, email, street, city, zip, password)=>{
});
  
When(/^the item with the item number of I00000Invalid is requested to be removed$/, async (memname, email, street, city, zip, password)=>{
});
  
Then(/^the item I000001 is removed from the list$/, async (memname, email, street, city, zip, password)=>{
});
  
Then(/^the item I000001 and item I000002 is removed from the list$/, async (memname, email, street, city, zip, password)=>{
});
  
Then(/^no item is removed from the list$/, async (memname, email, street, city, zip, password)=>{
});
  
And(/^the item list is initialized$/, async (memname, email, street, city, zip, password)=>{
});
  
And(/^The user is notified that the item number is invalid, an \"([^\"]*)\" messge is issued.$/, async (memname, email, street, city, zip, password)=>{
});