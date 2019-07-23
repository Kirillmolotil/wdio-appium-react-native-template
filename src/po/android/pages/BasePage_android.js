const ErrorPopUp = require("../components/common/ErrorPopUp_android");
const Alert = require('../components/common/NativeAlert_android');
const NotificationPopUp = require('../components/NotificationPopUp_android');
const Tooltip = require('../components/Tooltip_android');

class BasePage {
  
  constructor() {

    this.timeout = browser.config.params.timeout;
    this.loadTimeout = browser.config.params.loadTimeout;
    this.animationTimeout = browser.config.params.animationTimeout;

    this.alert = new Alert();
    this.errorPopUp = new ErrorPopUp();
    this.tooltip = new Tooltip();
    this.notificationPopUp = new NotificationPopUp();
  
  };

}

module.exports = BasePage;