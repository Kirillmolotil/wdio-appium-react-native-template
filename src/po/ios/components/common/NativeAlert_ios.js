class NativeAlert {

    constructor() {
        this.loadTimeout = browser.config.params.loadTimeout;
        this.animationTimeout = browser.config.params.animationTimeout;
    };

    get title() { return $('(//XCUIElementTypeAlert//XCUIElementTypeStaticText[@name])[1]') };
    get message() { return $('(//XCUIElementTypeAlert//XCUIElementTypeStaticText[@name])[2] | //XCUIElementTypeAlert//XCUIElementTypeStaticText[@name]') };

    async reject() {
        try {

            await browser.execute('mobile: alert', { 'action': 'dismiss' });

        } catch (e) {
            new Error('Alert did not appear');
        }
        await browser.pause(this.animationTimeout);
    };

    async confirm() {
        try {

            await browser.execute('mobile: alert', { 'action': 'accept' });

        } catch (e) {
            new Error('Alert did not appear');
        }
        await browser.pause(this.animationTimeout);
    };
}

module.exports = NativeAlert;