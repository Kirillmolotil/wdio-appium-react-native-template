const yargs = require("yargs").argv;

let { common_config, androidConfig, iosConfig, sauseLabsAndroidConfig, sauseLabsIosConfig, common_sauce_config } = require('./common_config');
const pathToSpec = yargs.pathToSpec ? yargs.pathToSpec : "./e2e/specs/*/*.js";

let capabilities;
const deviceType = yargs.deviceType ? yargs.deviceType.toLowerCase() : "android";

switch (deviceType) {

  case "android":
    capabilities = [{ ...androidConfig }];
    common_config.specs.push(`${pathToSpec}`);
    break;

  case "ios":
    capabilities = [{ ...iosConfig }];
    common_config.specs.push(`${pathToSpec}`);
    break;

  case "saucelabs:android":
    capabilities = [{ ...sauseLabsAndroidConfig }];
    common_config.specs.push(`${pathToSpec}`);
    common_config = common_sauce_config;
    common_config.params.deviceType = "android";
    break;

  case "saucelabs:ios":
    capabilities = [{ ...sauseLabsIosConfig }];
    common_config.specs.push(`${pathToSpec}`);
    common_config = common_sauce_config;
    common_config.params.deviceType = "ios";
    break;

  default:
    capabilities = [{ ...androidConfig }];
    common_config.specs.push(`${pathToSpec}`);
    break;

};

exports.config = Object.assign({}, common_config, {
  capabilities: capabilities
});