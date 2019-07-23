const Utils = require('../../../utils/Utils');
class NotificationPopUp {

    constructor() {
        this.animationTimeout = browser.config.params.animationTimeout;
    };

    get logo() { return $('//XCUIElementTypeImage[@name="notif_illustation"][@visible="true"]') };
    get description() { return $('//XCUIElementTypeStaticText[@name="notif_illustation_desc"][@visible="true"]') };
    get sureButton() { return $('//XCUIElementTypeOther[@name="sure_btn"][@visible="true"]') };
    get noThanksButton() { return $('//XCUIElementTypeOther[@name="no_thanks_btn"][@visible="true"]') };

    async confirm() {
        await Utils.element.click(this.sureButton, 'Sure button', this.animationTimeout);
    };

    async clickNoThanksButton() {
        await Utils.element.click(this.noThanksButton, 'No thanks button', this.animationTimeout);
        await Utils.wait.forPreloaderDisappear();
    };

}
 
module.exports = NotificationPopUp;