const Utils = require('../../../utils/Utils');

class TutorialPopUp {

    constructor() {
        this.animationTimeout = browser.config.params.animationTimeout;
    };

    get cardAnimation () { return $('//XCUIElementTypeImage[@visible="true"]') };
    get cardTitle () { return $('//XCUIElementTypeStaticText[@name="card_title"][@visible="true"]') };
    get cardDescription () { return $('//XCUIElementTypeStaticText[@name="card_description"][@visible="true"]') };
    get actionButton () { return $('//XCUIElementTypeOther[@name="Next"][@visible="true"] | //XCUIElementTypeOther[@name="Get Started"][@visible="true"]') };
    get paginationDots () { return $$('//XCUIElementTypeOther[@name="dot"][@visible="true"]') };
    get skipButton () { return $('//XCUIElementTypeOther[@name="skip_btn"][@visible="true"]') };

    async actionButtonClick() {
        await Utils.element.click(this.actionButton, 'Action button', this.animationTimeout);
    };

    async skipButtonClick() {
        await Utils.element.click(this.skipButton, 'Skip button', this.animationTimeout);
    };
}

module.exports = TutorialPopUp;