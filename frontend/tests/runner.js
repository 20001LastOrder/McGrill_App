const {spawn} = require("child_process");

process.env.NODE_ENV = 'testing'
const server = require('../scripts/start.js');

server.ready.then(()=>{
    var isWin = process.platform === "win32";
    var slash;
    if(isWin){
        slash = '\\';
    }else{
        slash = '/'
    }

<<<<<<< HEAD
    const options = ['--require', 'tests/cucumber.conf.js', '--require', 'tests/featureDefinitions', '--format', 'node_modules/cucumber-pretty', 'tests/features/ID040_Filter_Restaurants_by_category.feature']
=======
    const options = ['--require', 'tests/cucumber.conf.js', '--require', 'tests/featureDefinitions', '--format', 'node_modules/cucumber-pretty', 'tests/features']
>>>>>>> 818af743ee4a7ebf184d82fead5b3c812fc89261
    const cmd = '.' + slash + 'node_modules' + slash + '.bin' + slash + 'cucumber-js' 
    var testServer = spawn(cmd, options, { stdio: 'inherit', shell: true });
    testServer.on('error', function(err) {
        console.error(err);
        process.exit(1);
    });

    testServer.on('exit', (code) => {
        server.close();
        process.exit(code);
    })
})
