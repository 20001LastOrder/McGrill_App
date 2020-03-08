const {setDefaultTimeout, AfterAll, BeforeAll, Before} = require('cucumber');
const {createSession, closeSession, startWebDriver, stopWebDriver} = require('nightwatch-api');
const axios = require('axios');

setDefaultTimeout(120000);


Before({timeout:30000}, async ()=>{
    await axios.post('http://localhost:5000/dev/clear', {});
})

BeforeAll(async() => {
    await startWebDriver({configFile: 'tests/nightwatch.conf.js'});
    await createSession({configFile: 'tests/nightwatch.conf.js'});
});

AfterAll(async () => {
    await closeSession();
    await stopWebDriver();
})

