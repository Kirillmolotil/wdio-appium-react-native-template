const Alert = require('../../po/ios/components/common/NativeAlert_ios');
class Safari {

    constructor() {
        this.timeout = browser.config.params.timeout;
        this.loadTimeout = browser.config.params.loadTimeout;
        this.bundleId = 'com.apple.mobilesafari';
        this.alert = new Alert();
    };

    get url() { return $('//XCUIElementTypeOther[@name="URL"][@visible="true"]') };
    get searchField() { return $('//XCUIElementTypeTextField[@name="URL"][@visible="true"]') };
    get returnLink() { $('//XCUIElementTypeButton[@name="Return to Pro Referral"][@visible="true"]') };
    get cancelSearchButton() { return $('//XCUIElementTypeButton[@name="Cancel"][@visible="true"]') };
    get showPagesButton() { return $('//XCUIElementTypeButton[@name="Pages"][@visible="true"] | //XCUIElementTypeButton[@name="Tabs"][@visible="true"]') };
    get closeTabButtons() { return $$('//XCUIElementTypeButton[@name="closeTabButton"][@visible="true"]') };
    get doneButton() { return $('//XCUIElementTypeButton[@name="Done"][@visible="true"]') };

    /**
     * Open browser
     */
    async open() {
        await browser.pause(this.loadTimeout);
    };

    /**
     * Get current URL
     * @returns {String} URL
     */
    async getURL() {
        const url = await this.url;

        // Accept browser permision alert (if exist)
        if (await url.isExisting() === false) {
            await this.alert.confirm();
        }

        // Accept location permision alert (if exist)
        if (await url.isExisting() === false) {
            await this.alert.confirm();
        }

        await url.click();

        const searchField = await this.searchField;
        const urlText = await searchField.getAttribute('value');
    
        const cancelSearchButton = await this.cancelSearchButton;
        await cancelSearchButton.click();

        return urlText;
    };

    /**
     * Close all tabs and close browser
     */
    async close() {
        const showPagesButton = await this.showPagesButton;
        await showPagesButton.click();

        const closeTabButtons = await this.closeTabButtons;

        for (const closeButton of closeTabButtons) {
            await closeButton.click();
        };

        const doneButton = await this.doneButton;

        if (doneButton.error === undefined) {
            await doneButton.click();
        }
        
        await this.forceStop();
    };

    /**
     * Force stop browser
     */
    async forceStop() {
        await driver.execute('mobile: terminateApp', { bundleId: this.bundleId });
    };

}

module.exports = Safari;