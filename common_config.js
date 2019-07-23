const path = require('path');
const fs = require('fs');
const yargs = require("yargs").argv;

const deviceName = yargs.deviceName ? yargs.deviceName : "Samsung Galaxy S8 WQHD GoogleAPI Emulator";
const platformVersion = yargs.platformVersion ? yargs.platformVersion.toString() : "7.0";
const deviceType = yargs.deviceType ? yargs.deviceType.toLowerCase() : "android";
const testTag = yargs.testTag ? yargs.testTag : '';

/**
 * Capabilities for iOS platform
 */
exports.iosConfig = {
  // Which mobile OS platform to use
  'platformName': 'iOS',
  // Mobile OS version	
  'platformVersion': platformVersion,
  // How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session
  'newCommandTimeout': 480,
  // Delays the invocation of -[XCUIApplicationProcess setEventLoopHasIdled:] by the number of seconds specified with this capability. 
  // This can help quiescence apps that fail to do so for no obvious reason (and creating a session fails for that reason). 
  // This increases the time for session creation because -[XCUIApplicationProcess setEventLoopHasIdled:] is called multiple times. 
  // If you enable this capability start with at least 3 seconds and try increasing it, if creating the session still fails. Defaults to 0.
  'wdaEventloopIdleDelay': 3,
  // If true, forces uninstall of any existing WebDriverAgent app on device. Set it to true if you want to apply different startup options for WebDriverAgent for each session. 
  // Although, it is only guaranteed to work stable on Simulator. Real devices require WebDriverAgent client to run for as long as possible without reinstall/restart to avoid issues
  'useNewWDA': true,
  // It allows to turn on/off waiting for application quiescence in WebDriverAgent, while performing queries. The default value is true
  'waitForQuiescence': false,
  // Initializing the app under test automatically. Appium does not install/launch the app under test if this is false. Defaults to true
  'autoLaunch': true,
  // Don't reset app state before this session
  'noReset': false,
  // Whether to display the output of the Xcode command used to run the tests. If this is true, there will be lots of extra logging at startup. Defaults to false
  'showXcodeLog': false,
  // Locale to set for iOS (XCUITest driver only) and Android. fr_CA format for iOS. CA format (country name abbreviation) for Android
  'locale': 'en_US',

  //optional
  'appiumVersion': '1.14',

  //can’t be blank
  'deviceName': deviceName,

  //path to your application (it’s better to use path resolving)
  'app': path.resolve(''),
  // Which automation engine to use	
  'automationName': "XCUITest",
  // Quantity of threads
  'maxInstances': 1,
};

/**
 * Capabilities for Android platform
 */
exports.androidConfig = {
  // Which mobile OS platform to use
  'platformName': 'Android',
  // Skips to start capturing logcat. It might improve performance such as network. Log related commands will not work. Defaults to false.
  'skipLogcatCapture': true,
  //optional
  'appiumVersion': '1.14',
  // How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session
  'newCommandTimeout': 480,

  // Have Appium automatically determine which permissions your app requires and grant them to the app on install. Defaults to false. If noReset is true, this capability doesn't work
  'autoGrantPermissions': true,
  //can’t be blank
  'deviceName': deviceName,

  //path to your application (it’s better to use path resolving)
  'app': path.resolve(''),
  // Which automation engine to use	
  'automationName': "uiautomator2",
  // Quantity of threads
  'maxInstances': 1
};

/**
 * Capabilities for Android platform on SauceLabs
 */
exports.sauseLabsAndroidConfig = {
  'deviceName': deviceName,
  // Device orientation
  'deviceOrientation': 'portrait',
  // Mobile OS version	
  'platformVersion': platformVersion,
  // Which mobile OS platform to use
  'platformName': 'Android',
  // Device type: phone/tablet
  'deviceType': 'phone',
  // If true, forces uninstall of any existing WebDriverAgent app on device. Set it to true if you want to apply different startup options for WebDriverAgent for each session. 
  // Although, it is only guaranteed to work stable on Simulator. Real devices require WebDriverAgent client to run for as long as possible without reinstall/restart to avoid issues
  'useNewWDA': true,
  // Don't reset app state before this session
  'noReset': false,
  // Have Appium automatically determine which permissions your app requires and grant them to the app on install. Defaults to false. If noReset is true, this capability doesn't work
  'autoGrantPermissions': true,
  // Path to app on Sauce storage
  'app': 'sauce-storage:someApkName.apk',
  // Test name
  'name': `Regression run on ${deviceType}`,
  'waitforTimeout': 300,
  // Timeout to executing command
  'commandTimeout': 300,
  // How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session
  'newCommandTimeout': 480,
  // Timeout for being idle
  'idleTimeout': 360,
  // Which automation engine to use
  'automationName': "uiautomator2",
  // Device Timezone on SauceLabs
  'timeZone': 'Los_Angeles',
  'maxInstances': 1,
};

/**
 * Capabilities for iOS platform on SauceLabs
 */
exports.sauseLabsIosConfig = {
  'deviceName': deviceName,
  // Device orientation
  'deviceOrientation': 'portrait',
  // Mobile OS version	
  'platformVersion': platformVersion,
  // Which mobile OS platform to use
  'platformName': 'iOS',
  // Device type: phone/tablet
  'deviceType': 'phone',
  // Path to app on Sauce storage
  'app': 'sauce-storage:someZipFileNameWithApp.zip',
  // Test name
  'name': `Regression run on ${deviceType}`,
  // How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session
  'newCommandTimeout': 480,
  // Amount of time in ms to wait for instruments before assuming it hung and failing the session
  'launchTimeout': 2000,
  // Delays the invocation of -[XCUIApplicationProcess setEventLoopHasIdled:] by the number of seconds specified with this capability. 
  // This can help quiescence apps that fail to do so for no obvious reason (and creating a session fails for that reason). 
  // This increases the time for session creation because -[XCUIApplicationProcess setEventLoopHasIdled:] is called multiple times. 
  // If you enable this capability start with at least 3 seconds and try increasing it, if creating the session still fails. Defaults to 0.
  'wdaEventloopIdleDelay': 3,
  // It allows to turn on/off waiting for application quiescence in WebDriverAgent, while performing queries. The default value is true
  'waitForQuiescence': false,
  // Locale to set for iOS (XCUITest driver only) and Android. fr_CA format for iOS. CA format (country name abbreviation) for Android
  'locale': 'en_US',
  // Quantity of threads
  'maxInstances': 1,
  'waitforTimeout': 300,
  // Timeout to executing command
  'commandTimeout': 300,
  // Timeout for being idle
  'idleTimeout': 360,
  // Which automation engine to use	
  'automationName': "XCUITest",
  // Device Timezone on SauceLabs
  'timeZone': 'Los_Angeles' 
};

/**
 * Common SauceLabs config
 */
exports.common_sauce_config = {
  // Logging verbosity: trace | debug | info | warn | error | silent
  'logLevel': 'error',
  'coloredLogs': true,
  'screenshotPath': './errorShots/',
  'baseUrl': 'http://localhost',
  'deviceOrientation': 'portrait',
  'specFileRetries': 0,
  'idleTimeout': 600,
  'services': ['sauce'],
  'user': 'user name',
  'key': 'some key',
  'region': 'us',
  'videoUploadOnPass': false,
  'recordScreenshots': true,
  params: {
    timeout: 30000,
    preloaderTimeout: 90000,
    animationTimeout: 1000,
    loadTimeout: 5000,
    retryActionTimeout: 10000,
    deviceType: deviceType,
    platformVersion: platformVersion
  },

  framework: 'mocha',
  mochaOpts: {
    // Use inline diffs
    'diff': true,
    // Test filter given regular expression
    'grep': testTag,
    // Files having this extension will be considered test files. Defaults to js
    'extension': ['js'],
    // Path to package.json
    'package': './package.json',
    // Slow threshold value
    'slow': 75,
    // Color TTY output from reporter
    'color': true,
    // Show full stacktrace upon failure
    'fullStackTrace': true,
    // Timeout threshold value
    'timeout': 480000,
  },
  sync: true,
  waitforTimeout: 40000,
  connectionRetryTimeout: 900000,
  connectionRetryCount: 3,

  reporters: [['allure', {
    outputDir: 'allure-results',
  }]],

  onPrepare: () => {
    const allureResultsPath = this.reporters[0][1].outputDir;
    this.deleteFiles(allureResultsPath);
    this.deleteFiles('src/data/logs');
  },

  afterTest: async test => {
    if (test.error !== undefined) {
      await browser.takeScreenshot();
    }
  },

  // Method for deleting files
  deleteFiles: path => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(file => {
        const curPath = path + "/" + file;
        fs.lstatSync(curPath).isDirectory() ? deleteFolderRecursive(curPath) : fs.unlinkSync(curPath);
      });
      fs.rmdirSync(path);
    };
  }
};

/**
 * Common local config
 */
exports.common_config = {
  specs: [],
  // Logging verbosity: trace | debug | info | warn | error | silent
  'logLevel': 'error',
  'coloredLogs': true,
  'screenshotPath': './errorShots/',
  'runner': 'local',
  'baseUrl': 'http://localhost',
  'deviceOrientation': 'portrait',
  'specFileRetries': 0,
  'idleTimeout': 600,
  params: {
    // Common timeout for test fails (time in ms)
    timeout: 20000,
    // Timeout for waiting preloader dissapeared (time in ms)
    preloaderTimeout: 90000,
    // Static time for waiting animation (time in ms)
    animationTimeout: 1500,
    // Timeout for waiting page loads (time in ms)
    loadTimeout: 5000,
    // To make retry action after retry timeout
    retryActionTimeout: 10000,
    // Device type: ios/android
    deviceType: deviceType,
    // Platform version
    platformVersion: platformVersion
  },

  framework: 'mocha',
  mochaOpts: {
    // Use inline diffs
    'diff': true,
    // Test filter given regular expression
    'grep': testTag,
    // Files having this extension will be considered test files. Defaults to js
    'extension': ['js'],
    // Path to package.json
    'package': './package.json',
    // Slow threshold value
    'slow': 75,
    // Color TTY output from reporter
    'color': true,
    // Show full stacktrace upon failure
    'fullStackTrace': true,
    // Timeout threshold value
    'timeout': 3000000,
  },
  'sync': true,
  'waitforTimeout': 40000,
  'connectionRetryTimeout': 900000,
  'connectionRetryCount': 3,

  //The same port where Appium started
  'port': 4723,

  'reporters': [['allure', {
    outputDir: 'allure-results',
  }]],

  // Method executes before test suite
  onPrepare: () => {
    const allureResultsPath = this.reporters[0][1].outputDir;
    this.deleteFiles(allureResultsPath);
    this.deleteFiles('src/data/logs');
  },

  // Method executes after each test
  afterTest: async test => {
    if (test.error !== undefined) {
      await browser.takeScreenshot();
    }
  },

  // Method for deleting files
  deleteFiles: path => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach( file => {
        const curPath = path + "/" + file;
        fs.lstatSync(curPath).isDirectory() ? deleteFolderRecursive(curPath) : fs.unlinkSync(curPath);
      });
      fs.rmdirSync(path);
    };
  }
};