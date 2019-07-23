class NativeAlert {

    constructor() {
        this.animationTimeout = browser.config.params.animationTimeout;
    };

    get message() { return $('//\*[contains(@resource-id, "alertTitle")]') };
    get confirmButton() { return $('//android.widget.Button[@text="OK" or @text="ALLOW"]') };

    async confirm() {
        const confirmButton = await this.confirmButton;
        await confirmButton.waitForDisplayed();
        await confirmButton.click();
    };

}

module.exports = NativeAlert;