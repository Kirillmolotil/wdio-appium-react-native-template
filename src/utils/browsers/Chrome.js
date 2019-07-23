const Alert = require('../../po/android/components/common/NativeAlert_android');

class Chrome {

    constructor() {
        this.timeout = browser.config.params.timeout;
        this.browserWaitTimeout = 1000;
        this.browserOpenAnimationTime = 5000;
        this.packageName = 'com.android.chrome';
        this.alert = new Alert();
    };

    get browserSelectTitle() { return $('//android.widget.TextView[@resource-id="android:id/title"]') };
    get acceptTermsButton() { return $('//\*[@resource-id="com.android.chrome:id/terms_accept"]') };
    get noThanksButton() { return $('//\*[@resource-id="com.android.chrome:id/negative_button"]') };
    get onceButton() { return $('//\*[@resource-id="android:id/button_once"]') };
    get alwaysButton() { return $('//\*[@resource-id="android:id/button_always"]') };
    get chromeButton() { return $('//android.widget.TextView[@text="Chrome"]') };
    get tabsButton() { return $('//\*[@resource-id="com.android.chrome:id/tab_switcher_button"]') };
    get menuButton() { return $('//\*[@resource-id="com.android.chrome:id/menu_button"]') };
    get addTabButton() { return $('//\*[@resource-id="com.android.chrome:id/new_tab_button"]') };
    get closeTabsButton() { return $('//android.widget.TextView[contains(@content-desc, "Close")][contains(@content-desc, "tabs")]') };
    get url() { return $('//android.widget.EditText[@resource-id="com.android.chrome:id/url_bar"]') };

    /**
     * Open browser
     */
    async open() {

        /**
         * Check that Google Chrome is installed on device
         */
        if (await this.isGoogleChromeInstaled()) {
            const browserSelectTitle = await this.browserSelectTitle;
            await browser.pause(this.browserWaitTimeout);

            /**
             * Check if defauld browser is set on device
             */
            if (await browserSelectTitle.isExisting()) {
                const title = await browserSelectTitle.getText();

                const onceButton = await this.onceButton;
                const chromeButton = await this.chromeButton;

                /**
                 * Check if pop up with selecting browser is appeared first time
                 */
                if (title === 'Open with') {
                    await chromeButton.click();
                    await onceButton.click();
                } else {
                    title.includes('Chrome') ? await onceButton.click() : await chromeButton.click();
                };
            }

            /**
             * Check if Google Chrome launches first time
             */
            const acceptTermsButton = await this.acceptTermsButton;
            await browser.pause(this.browserWaitTimeout);
            if (await acceptTermsButton.isExisting()) {
                await acceptTermsButton.click();
                const noThanksButton = await this.noThanksButton;
                await noThanksButton.waitForDisplayed(this.timeout);
                await noThanksButton.click();
            };

            await browser.pause(this.browserOpenAnimationTime);

        } else {
            throw new Error('Google Chrome is not installed on device');
        }
    };

    /**
     * Get current URL
     * @returns {String} URL
     */
    async getURL() {
        let url = await this.url;

        // Confirm alert if exist
        if (await url.isDisplayed() === false) {
            await this.alert.confirm();
            url = await this.url;
        } 

        return await url.getText();
    };

    /**
     * Close all tabs and close browser
     */
    async close() {
        const tabsButton = await this.tabsButton;
        await tabsButton.click();

        const menuButton = await this.menuButton;
        await menuButton.click();

        const closeTabsButton = await this.closeTabsButton;
        await closeTabsButton.click();

        const addTabButton = await this.addTabButton;
        await addTabButton.click();
        await this.forceStop();
    };

    /**
     * Force stop browser
     */
    async forceStop() {
        await browser.execute('mobile: shell', { command: 'am force-stop ' + this.packageName});
    };

    /**
     * Clear browser cache
     */
    async clearCache() {
        await browser.execute('mobile: shell', { command: 'pm clear ' + this.packageName});
    };

    /**
     * Check is Google Chrome installed
     */
    async isGoogleChromeInstaled() {
        return await browser.isAppInstalled(this.packageName);
    }

}

module.exports = Chrome;