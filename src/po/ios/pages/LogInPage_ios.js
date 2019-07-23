const BasePage = require("./BasePage_ios");
const Utils = require('../../../utils/Utils');
const TutorialPopUp = require('../components/TutorialPopUp_ios');
class LogInPage extends BasePage {

    constructor() {
        super();
        this.tutorialPopUp = new TutorialPopUp();
    };

    get logoImg () { return $('//XCUIElementTypeImage[@name="logo_icon"][@visible="true"]') };
    get emailField () { return $('//XCUIElementTypeTextField[@name="input_field"][@visible="true"]') };
    get inputPassword () { return $('//XCUIElementTypeSecureTextField[@name="input_field"][@visible="true"]') };
    get passwordHideIcon () { return $('//XCUIElementTypeOther[@name="password_toggle"][@visible="true"]') };
    get signInButton () { return $('//XCUIElementTypeOther[@name="sign_in_btn"][@visible="true"]') };
    get signInLabel () { return $('//XCUIElementTypeStaticText[@name="sign_in_title"][@visible="true"]') };
    get forgotPasswordLink () { return $('//XCUIElementTypeOther[@name="forgot_password"][@visible="true"]') };
    get newToProReferralLink () { return $('//XCUIElementTypeStaticText[@name="new_pro_ref_text"][@visible="true"]') };
    get signUpLink () { return $('//XCUIElementTypeOther[@name="sign_in_up_btn"][@visible="true"]') };


    async loginWithCreds (login, password) {
        await this.enterCredsAndLogin(login, password);

        // Skip tutorial
        await this.tutorialPopUp.skipButtonClick();

        // Disable receiving notifications
        await this.notificationPopUp.clickNoThanksButton();

        // Close tooltip
        await this.tooltip.close();
    };

    async enterCredsAndLogin(login, password) {
        const emailInputField = await Utils.wait.forDisplayed(this.emailField, 'Email field');
        const passwordInputField = await Utils.wait.forDisplayed(this.inputPassword, 'Password field');

        await emailInputField.setValue(login);
        await passwordInputField.setValue(password);
        await Utils.element.click(this.signInButton, 'Sign In button', this.animationTimeout);
    };

    async forgotPasswordLinkClick() {        
        await Utils.element.click(this.forgotPasswordLink, 'Forgot password link', this.animationTimeout);
    };

}
 
module.exports = LogInPage;