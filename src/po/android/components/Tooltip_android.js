const Utils = require('../../../utils/Utils');

class Tooltip {

    get text() { return $('~tooltip_text') };
    get button() { return $('~tooltip_button') };

    async close() {
        await Utils.element.click(this.button, 'Tooltip button');
    };

};
 
module.exports = Tooltip;