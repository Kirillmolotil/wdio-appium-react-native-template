class WaitUtils {

    /**
     * Constructor
     */
    constructor() {
        this.deviceType = browser.config.params.deviceType;
        this.animationTimeout = browser.config.params.animationTimeout;
        this.preloaderTimeout = browser.config.params.preloaderTimeout;
        this.retryActionTimeout = browser.config.params.retryActionTimeout;
        this.timeout = browser.config.params.timeout;
    }

    get loadAnimation () {
        return this.deviceType === 'android'
            ? $('//android.widget.FrameLayout[@content-desc="activity_indicator"]/android.widget.ProgressBar | //android.view.ScrollView/following-sibling::android.widget.ImageView')
            : $('//XCUIElementTypeActivityIndicator[@name="In progress"][@visible="true"]');
    };

    get scrollView () { 
        return this.deviceType === 'android'
            ? $('//android.widget.ScrollView')
            : $('//XCUIElementTypeOther[contains(@name, "placeholder")]/XCUIElementTypeScrollView[@visible="true"]');
        };
        
    get emptyListImage () { 
        return this.deviceType === 'android'
            ? $('//android.view.ViewGroup[@content-desc="current_page_placeholder"]/android.widget.ImageView')
            : $('//XCUIElementTypeImage[@name="current_page_placeholder_img"][@visible="true"]')
        };

    /**
     * Wait for preloader disappeared
     * @param {Number} timeout 
     */
    async forPreloaderDisappear(timeout = this.preloaderTimeout) {
        await browser.pause(this.animationTimeout);

        const loader = await this.loadAnimation;
        
        await loader.waitUntil( async () => {
            return await loader.isDisplayed() === false;
        }, timeout, "Load animation didn't disappear");
        
        return await browser.pause(500);
    };

    /**
     * Wait for scroll view displayed
     * @param {Number} timeout 
     */
    async forScrollViewAppeared(timeout = this.timeout) {
        await browser.pause(this.animationTimeout);

        const scroll = await this.scrollView;
        const image = await this.emptyListImage;

        return await (scroll.waitForDisplayed(timeout) || image.waitForDisplayed(timeout));
    };

    /**
     * Wait until element to be displayed
     * @param {Element} el
     * @param {String} elementName
     * @returns {Element} desired element
     */
    async forDisplayed(el, elementName = 'Element', pause = 0) {
        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);

        await element.waitUntil( async () => {
            return this.deviceType === 'android' ? await element.isDisplayed() : await element.getAttribute('visible') === 'true';
        }, this.timeout, `${elementName} is not displayed`);

        await browser.pause(pause);

        return element;
    };

    /**
     * Wait until element to be displayed
     * @param {Element} el
     * @param {String} elementName
     * @returns {Element} desired element
     */
    async tryWaitForDisplayed(el, elementName = 'Element', retryTimeout = this.retryActionTimeout) {

        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);

        if (await element.isDisplayed()) {
            return element;
        } else {
            await browser.pause(retryTimeout);
            return await this.forDisplayed(el, elementName);
        }

    };

    /**
     * iOS only
     * Wait until tab be active
     * @param {Element} tab
     * @param {String} tabName
     */
    async forTabBeActive(tab, tabName = 'Tab') {

        const element = await tab;

        await element.waitUntil( async () => {
            return await element.getAttribute('value') === '1';
        }, this.timeout, `${tabName} didn't selected`);
    };

}

module.exports = WaitUtils;