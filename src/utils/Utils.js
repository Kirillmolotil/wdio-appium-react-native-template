const Browser = browser.config.params.deviceType === 'android' ? require('./browsers/Chrome') : require('./browsers/Safari');
const DataGenerator = require('./DataGenerator');
const Element = require('./Element');
const Platform = require('./Platform');
const Screen = require('./Screen');
const SwipeUtils = require('./SwipeUtils');
const WaitUtils = require('./WaitUtils');


class Utils {

    constructor() {
        this.browser = new Browser();
        this.dataGenerator = new DataGenerator();
        this.element = new Element();
        this.platform = new Platform();
        this.screen = new Screen();
        this.swipe = new SwipeUtils();
        this.wait = new WaitUtils();
    }

}

module.exports = new Utils();
