const Screen = require('./Screen');
const moment = require('moment');
class Element {

    /**
     * Constructor
     */
    constructor() {
        this.screen = new Screen();

        this.deviceType = browser.config.params.deviceType;
        this.timeout = browser.config.params.timeout;
    };

    /**
     * Get text inside element
     * @param {Element} el 
     */
    async getText (el) {
        const element = await el;

        if (element.isExisting()) {
            if (this.deviceType === 'android') {
                return await element.getText();
            } else {
                let value = await element.getAttribute('value');

                if (value === null) {
                    value = await element.getAttribute('label');
                }

                return value;
            }
        } else {
            return undefined;
        }
     };

    /**
     * Get values from elements
     * @param {Array} elements
     */
    async getValues (elements) {
        
        let values = [];

        for (const el of elements) {
            const value = await this.getText(el);
            values.push(value);
        }

        return values;
    };

     /**
      * Click to element
      * @param {Element} el 
      */
     async click(el, elementName = 'Element', pause = 100) {
        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);

        await element.waitUntil( async () => {
            return this.deviceType === 'android'
                ? await element.getAttribute('clickable') === 'true' || await element.getAttribute('displayed') === 'true' 
                : await element.getAttribute('visible') === 'true' || await element.getAttribute('enabled') === 'true';
        }, this.timeout, `${elementName} is not clickable`);

        await element.click();
        await browser.pause(pause);
     };

     /**
      * Click to element using element coordinates
      * @param {Element} el 
      */
     async clickByCoordinates(el, elementName = 'Element', pause = 100) {
        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);
        
        const params = {
            'x': await element.getLocation('x'),
            'y': await element.getLocation('y')
        };

        this.deviceType === 'android'
            ? await driver.touchPerform([
                { action: 'tap', options: params },
                { action: 'release' }
            ])
            : await browser.execute('mobile: tap', params);
    
        await browser.pause(pause);
     };

     /**
      * Safe method for checking is element exist
      * @param {Element} el
      * @returns {Boolean}
      */
     async isExisting(el) {
        const element = await el;

        try {
            return await element.isExisting();
        } catch (e) {
            console.log(e.message);
            return false;   
        }
     }


     /**
      * Safe method for checking is element displayed
      * @param {Element} el
      * @returns {Boolean}
      */
     async isDisplayed(el) {
        const element = await el;

        try {
            return await element.isDisplayed();
        } catch (e) {
            console.log(e.message);
            return false;      
        }
     }
     

     /**
      * Get width position in percents
      * @param {Element} el
      */
     async getXLocation(el, elementName = 'Element') {
        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);

        const deviceWidth = await this.screen.getWidth();
        const x = await element.getLocation('x');
        const elementWidth = await element.getSize('width');
        const xPosition = x + elementWidth / 2;

        return Math.round((xPosition / deviceWidth) * 100); 
     };

    /**
      * Get height position in percents
      * @param {Element} el
      */
     async getYLocation(el, elementName = 'Element') {
        const element = await el;
        await element.waitForExist(this.timeout, `${elementName} does not exist`);

        const deviceHeight = await this.screen.getHeight();
        const y = await element.getLocation('y');
        const elementHeight = await element.getSize('height');
        const yPosition = y + elementHeight / 2;

        return Math.round((yPosition / deviceHeight) * 100); 
     };

     _parseBounds(bounds) {
         const regex = /\d+/g;
         return bounds.match(regex).map(Number);
     };

}

module.exports = Element;