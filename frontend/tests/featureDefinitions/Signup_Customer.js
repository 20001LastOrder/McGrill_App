const {client} = require('nightwatch-api');
const {Given, Then, When} = require('cucumber');

async function setUserInfo(memname, email, street, city, zip, password){
    await client.setValue('input[name=name]', memname);
    await client.setValue('input[name=email]', email);
    await client.setValue('input[name=street]', street);
    await client.setValue('input[name=city]', city);
    await client.setValue('input[name=zipcode]', zip);
    await client.setValue('input[name=password]', password);
    await client.setValue('input[name=confirm_password]', password);
}

Given(/^member of McGill (.+) with McGill email address (.+), address (.+) (.+) (.+) and create valid password (.+)$/, async (memname, email, street, city, zip, password)=>{
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    // add a person
    await setUserInfo(memname, email, street, city, zip, password);
});

Given(/^member of McGill (.+) with McGillemail address (.+), address (.+) (.+) (.+) and create invalid password (.+)$/, async (memname, email, street, city, zip, password)=>{
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    await setUserInfo(memname, email, street, city, zip, password);
})

Given(/^Dawood Harrington uses email address dawood.h@mcgill.ca is an user of McGrill System$/, async ()=>{
    // register him first
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    await setUserInfo('Dawood Harrington', 'dawood.h@mcgill.ca', 'No Street', 'No City', 'H2X2D2', 'dB1111111');
    await client.click('input[type=submit]')
    await client.pause(1000);

    //log out
    await client.expect.element('button[name=signout_btn]').to.be.visible;
    await client.click('button[name=signout_btn]');
    await client.pause(500);
    //go to registration again
    await client.url('http://localhost:3000/user/signup').waitForElementVisible('body', 2000);
    await setUserInfo('Dawood Harrington', 'dawood.h@mcgill.ca', 'No Street', 'No City', 'H2X2D2', 'dB1111111');
})

When(/^member of McGill (.+) requests to create a new account$/, async(memname)=>{
    await client.click('input[type=submit]');
    await client.pause(1000);
})

When(/^Dawood Harrington request to create a consumer account$/, async ()=>{
    await client.click('input[type=submit]');
    await client.pause(1000);
})

Then(/^a new user of Consumer type with name (.+), email address (.+) is added to the system$/, async function (memname, email) {
    await client.expect.element('button[name=signout_btn]').to.be.visible;
});

Then(/^an \"([^\"]*)\" message is issued$/, (message)=>{
    return client.getAlertText((result)=>{
        client.assert.equal(result.value, message);
        client.acceptAlert();
    });
});

Then(/^member of McGill (.+) should not be registered$/, async (memname)=>{
    await client.expect.element('button[name=signout_btn]').to.be.not.present;
});