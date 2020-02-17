
Given(/^Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is a McGill University administrator with good standing$/, async (memname, email, street, city, zip, password) => {
});
  
Given(/^Amman Sumner with employee id INVALID_ID$/, async (memname, email, street, city, zip, password) => {
});
  
Given(/^Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is an administrator of the system$/, async (memname, email, street, city, zip, password) => {
});
  
When(/^Liya Nelson requests to create the system administration account$/, async (memname, email, street, city, zip, password) => {
});
  
When(/^Amman Sumner requests to create the system administration account$/, async (memname, email, street, city, zip, password) => {
});
  
Then(/^an user with name Liya Nelson and email liya.nelson@mcgill.com is created, a password liyaNelson001 is created$/, async (memname, email, street, city, zip, password) => {
});
  
Then(/^an \"([^\"]*)\" error is issued.$/, function (invalidemployeeid, callback) {
});