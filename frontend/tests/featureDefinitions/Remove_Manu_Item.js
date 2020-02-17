const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^user R is logged in as a restaurant owner$/, async ()=>{
});
  
When(/^the item with the item number of I000001 is requested to be removed$/, async ()=>{
});
  
When(/^the items with the item number of I000001 and I000002 are requested to be removed at the same time$/, async ()=>{
});
  
When(/^the item with the item number of I00000Invalid is requested to be removed$/, async ()=>{
});
  
Then(/^the item I000001 is removed from the list$/, async ()=>{
});
  
Then(/^the item I000001 and item I000002 is removed from the list$/, async ()=>{
});
  
Then(/^no item is removed from the list$/, async ()=>{
});
  
Then(/^the item list is initialized$/, async ()=>{
});
  
Then(/^The user is notified that the item number is invalid, an \"([^\"]*)\" messge is issued.$/, async (invalidmenuitem)=>{
});