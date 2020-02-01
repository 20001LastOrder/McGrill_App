const {spawn, exec} = require("child_process");


function waitFotTime(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, time);
    });
  }

(async()=>{
    const server = exec('npm start', (error, stdout, stderr)=>{
        console.log(stdout);
    });

    await waitFotTime(5000);
    var isWin = process.platform === "win32";
    var slash;
    if(isWin){
        slash = '\\';
    }else{
        slash = '/'
    }

    const options = ['--require', 'tests/cucumber.conf.js', '--require', 'tests/featureDefinitions', '--format', 'node_modules/cucumber-pretty', 'tests/features']
    const cmd = '.' + slash + 'node_modules' + slash + '.bin' + slash + 'cucumber-js;' 
    var testServer = spawn(cmd, options, { stdio: 'inherit', shell: true });
    testServer.on('error', function(err) {
        console.error(err);
        process.exit(1);
    });

    testServer.on('exit', (code) => {
        server.kill('SIGTERM');
        process.exit(code);
    })
    
})();