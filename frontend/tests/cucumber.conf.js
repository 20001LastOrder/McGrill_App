const {setDefaultTimeout, AfterAll, BeforeAll, Before} = require('cucumber');
const {createSession, closeSession, startWebDriver, stopWebDriver} = require('nightwatch-api');
const axios = require('axios');

setDefaultTimeout(60000);

Before((done)=>{
    axios.post('http://localhost:5000/dev/clear', {}).then((res)=>{
        done();
    });
})

BeforeAll(async() => {
    await startWebDriver({configFile: 'tests/nightwatch.conf.js'});
    await createSession({configFile: 'tests/nightwatch.conf.js'});
});

AfterAll(async () => {
    await closeSession();
    await stopWebDriver();

    // stop everything if time out (sometimes the test does not exit after it finishes)
    setTimeout(()=>{
        process.exit(0);
    }, 1000);
})

