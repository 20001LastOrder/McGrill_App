const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

Given(/^user (.+) of user type (.+) with email (.+), password (.+) is registered in the McGrill Application System$/, function (username, usertype, email, password, callback) {

});
  
Given(/^The user has the McGrill Application open on their device$/, async (memname, email, street, city, zip, password) => {

});
  
When(/^user (.+) requests to view their user profile$/, async (memname, email, street, city, zip, password) => {

});
  
When(/^The user requests to view their user profile$/, async (memname, email, street, city, zip, password) => {

});
  
Then(/^user (.+) should get the profile containing (.+), (.+) and (.+)$/, async (memname, email, street, city, zip, password) => {

});
  
Then(/^a \"([^\"]*)\" error message is issued$/, async (memname, email, street, city, zip, password) => {

});
  
And(/^user (.+) is logged into the McGrill Application$/, async (memname, email, street, city, zip, password) => {

});