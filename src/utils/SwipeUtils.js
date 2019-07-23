const WaitUtils = require('./WaitUtils');
const Screen = require('./Screen');
const Element = require('./Element');
const { screen } = require('../../constants/screen');
class SwipeUtils {

    /**
     * Constructor
     */
    constructor() {

        this.screen = new Screen();
        this.element = new Element();
        
        this.deviceType = browser.config.params.deviceType;

        this.min = 0.1;
        this.max = 0.9;
        this.maxScrollQuantity = 10;

    };

    /**
     * Swipe right
     */
    async right() {
        const height = (await this.screen.getWidth()) / 2;
        const startWidth = this.min * (await this.screen.getWidth());
        const endWidth = this.max * (await this.screen.getWidth());

        return await this._swipe(startWidth, endWidth, height, height);
    };

    /**
     * Swipe left
     */
    async left() {
        const height = (await this.screen.getWidth()) / 2;
        const startWidth = this.max * (await this.screen.getWidth());
        const endWidth = this.min * (await this.screen.getWidth());

        return await this._swipe(startWidth, endWidth, height, height);
    };

    /**
     * Swipe down
     */
    async down() {
        const width = (await this.screen.getWidth()) / 2;
        const startHeight = this.max * (await this.screen.getWidth());
        const endHeight = this.min * (await this.screen.getWidth());
        return await this._swipe(width, width, startHeight, endHeight);
    };

    /**
     * Swipe actions
     * @param {Number} startWidth 
     * @param {Number} endWidth 
     * @param {Number} startHeight 
     * @param {Number} endHeight 
     */
    async _swipe(startWidth, endWidth, startHeight, endHeight) {
        return await driver.touchPerform([
            { action: 'press', options: { x: startWidth, y: startHeight } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: endWidth, y: endHeight } },
            { action: 'release' }
        ]);
    };

    /**
     * Scroll to element
     * @param {Element} element 
     */
    async toElement(element) {
        let desiredElement = await element;

        const width = (await this.screen.getWidth()) / 2;
        const startHeight = 0.5 * (await this.screen.getWidth());
        const endHeight = 0.3 * (await this.screen.getWidth());

        if (desiredElement.error === undefined) {
            return desiredElement;
        } else {

            for (let i = 0; i <= this.maxScrollQuantity; i++) {
                await this._swipe(width, width, startHeight, endHeight);

                desiredElement = await element;

                if (await desiredElement.isExisting()) { 
                    break;
                }
            };

            const wait = new WaitUtils();
            wait.forPreloaderDisappear(this.timeout)

            if (await desiredElement.isExisting()) {
                const deviceHeigth = await this.screen.getHeight();
                const elementYLocation = await desiredElement.getLocation('y');

                if (elementYLocation / deviceHeigth > 0.8) {
                    await this._swipe(width, width, startHeight, endHeight);
                }
            }
            
            const yLocationPercent = await this.element.getYLocation(desiredElement);

            // Swipe one more time if element is in the botom of the screen
            if (yLocationPercent >= screen.BOTTOM_PANEL) {
                await this._swipe(width, width, startHeight, endHeight);
            }

            return desiredElement;
        }
    };

    /**
     * Swipe down IOS only
     */
    async downIOS() {
        await browser.execute('mobile: scroll', {direction: 'down'});
    };

    /**
     * Swipe up IOS only
     */
    async upIOS() {
        await browser.execute('mobile: scroll', {direction: 'up'});
    };

    /**
     * Swipe left IOS only
     */
    async leftIOS() {
        await browser.execute('mobile: scroll', {direction: 'left'});
    };

    /**
     * Swipe right IOS only
     */
    async rightIOS() {
        await browser.execute('mobile: scroll', {direction: 'right'});
    };

    /**
     * Get device screen width
     * @returns {Number} width
     */
    async _getWidth() {
        return (await driver.getWindowSize())['width'];
    };

    /**
     * Get device screen height
     * @returns {Number} height
     */
    async _getHeight() {
        return (await driver.getWindowSize())['height'];
    };

}

module.exports = SwipeUtils;