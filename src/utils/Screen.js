class ScreenUtils {

    /**
     * Get device screen width
     * @returns {Number} width
     */
    async getWidth() {
        return (await driver.getWindowSize())['width'];
    };

    /**
     * Get device screen height
     * @returns {Number} height
     */
    async getHeight() {
        return (await driver.getWindowSize())['height'];
    };

    /**
     * Perform tap by coordinates
     * @param {Number} x coordinate
     * @param {Number} y coordinate
     * @param {Number} timeout for execution comand. Default: 500ms
     */
    async performTapByCoordinates(x ,y, timeout = 500) {
        await driver.touchPerform([
            { action: 'tap', options: { x: x, y: y } },
            { action: 'release' }
        ]);
        await browser.pause(timeout);
    };

}

module.exports = ScreenUtils;