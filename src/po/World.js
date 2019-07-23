let LogInPage;

const deviceType = browser.config.params.deviceType;

if (deviceType === 'android') {
	LogInPage = require('./android/pages/LogInPage_android');
} else {
	LogInPage = require('./ios/pages/LogInPage_ios');
}

class World {
	constructor() {

		this.logInPage = new LogInPage();
		
	}
}

module.exports = new World();