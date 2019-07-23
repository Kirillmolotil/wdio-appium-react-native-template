# React Native mobile application testing framework README

Make sure you have the latest versions of the following installed:

    - Node.js,
    - Python,
    - Appium

    for iOS:
        - XCode,
        - Xcode Command Line Tools,
        - Carthage.
        
    for Android:
        - Java Development Kit.

### Diagnose and fix common Node, iOS and Android configuration issues before starting Appium
    1. Install Appium Doctor: 
        ```
        npm install appium-doctor -g
        ```
    2. Diagnose issues and resolve
        ```
        appium-doctor --android
        appium-doctor --ios
        ```

### Install npm dependencies
    ```
    npm install
    ```
### Install and start Appium server (Required for local test run)
### Set path to iOS/Anrdoid build in common-config.js of test framework (Required for local test run)

    - iOS:
        exports.iosConfig = {
            // path to your application (it’s better to use path resolving)
            'app': path.resolve(''),
        };

    - Android:
        exports.androidConfig = {
            // path to your application (it’s better to use path resolving)
            'app': path.resolve(''),
        };

### Run Appium tests from cli
    - iOS:
        npm run test -- --deviceType ios

    - Android:
        npm run test -- --deviceType android

    - iOS SauceLabs:
        npm run test -- --deviceType saucelabs:ios

    - Android SauceLabs:
        npm run test -- --deviceType saucelabs:android
        
        // Mobile OS version (optional)
        --platformVersion. Default: 7.0

        // Name of the device (required)
        --deviceName

        // Run tests which marked tags (optional)
        --testTag. Default: All tests

        // Path to test specs (optional)
        --pathToSpec. Default: ./e2e/specs/*/*.js

### Generate report after test run
    ```
    npm run allure:open
    ```
