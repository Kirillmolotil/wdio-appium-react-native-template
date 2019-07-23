const Utils = require('../../../utils/Utils');

class TutorialPopUp {

    constructor() {
        this.animationTimeout = browser.config.params.animationTimeout;
    };

    get cardAnimation () { return $('//android.widget.TextView[@content-desc="card_title"]/../android.widget.ImageView') };
    get cardTitle () { return $('~card_title') };
    get cardDescription () { return $('~card_description') };
    get actionButton () { return $('~card_btn') };
    get paginationDots () { return $$('~dot') };
    get skipButton () { return $('~skip_btn') };

    async actionButtonClick() {
        await Utils.element.click(this.actionButton, 'Action button', this.animationTimeout);
    };

    async skipButtonClick() {
        await Utils.element.click(this.skipButton, 'Skip button', this.animationTimeout);
        await Utils.wait.forPreloaderDisappear();
        await browser.pause(this.animationTimeout);
    };

}

module.exports = TutorialPopUp;