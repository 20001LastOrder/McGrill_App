const {setDefaultTimeout, AfterAll, BeforeAll} = require('cucumber');
const {createSession, closeSession, startWebDriver, stopWebDriver} = require('nightwatch-api');
const {exec} = require("child_process");

setDefaultTimeout(60000);
var server;

function resolveAfter3Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 3000);
    });
  }

BeforeAll(async() => {
    await startWebDriver({configFile: 'tests/nightwatch.conf.js'});
    await createSession({configFile: 'tests/nightwatch.conf.js'});
    var build = exec('npm build', function(err, stdout, stderr){

    });
    server = exec('serve -s build', function(err, stdout, stderr){

    });
    await resolveAfter3Seconds();
});

AfterAll(async () => {
    await closeSession();
    await stopWebDriver();
    server.kill();
    console.log('finished')
    process.exit(0);
})

