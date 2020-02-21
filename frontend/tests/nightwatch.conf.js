const chromedriver = require('chromedriver');

module.exports = {
    test_settings:{
        default:{
            webdriver:{
                start_process: true,
                server_path: chromedriver.path,
                port: 4444,
                cli_args: ['--port=4444']
            },
            desiredCapabilities:{
                browserName: 'chrome',
                chromeOptions : {
                    args : ["headless"]
                }
            }
        }
    }
}
