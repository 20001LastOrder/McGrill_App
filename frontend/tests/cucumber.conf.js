const {setDefaultTimeout, AfterAll, BeforeAll} = require('cucumber');
const {createSession, closeSession, startWebDriver, stopWebDriver} = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async() => {
    await startWebDriver({configFile: 'tests/nightwatch.conf.js'});
    await createSession({configFile: 'tests/nightwatch.conf.js'});
});

AfterAll(async () => {
    await closeSession();
    await stopWebDriver();
})

