const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');
Given(/^Joe Rangel is logged in as a restaurant owner$/, async()=> {
    
});

Given(/^Joe Rangel owns a restaurant Joe1$/, async()=> {

});

Given(/^Joe1 has the following orders$/, async()=> {

});

Given(/^(.+) is in status (.+)$/, async (orderid, status) => {

});

Given(/^order 1111 is not complete$/, async()=> {

});

When(/^Joe Rangel request to change the status of the order$/, async()=> {

});

Then(/^the status of (.+) changes to (.+)$/, async (orderid, newstatus) => {

});

Then(/^the status of order 1111 changes to cancelled$/, async () => {

});


//ignore error case
Given(/^NonUser is not logged into the system$/, async()=> {

});

Given(/^order 1111 is complete$/, async()=> {

});

Then(/^a \"([^\"]*)\" message is issued;$/, async () =>{

});

When(/^NonUser requests change the status of order 1111$/, async () => {

});

Then(/^A \"([^\"]*)\" Message is issued$/, async (pleaselogin, ) => {
});