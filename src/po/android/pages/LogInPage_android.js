const BasePage = require("./BasePage_android");
const Utils = require("../../../utils/Utils");
const TutorialPopUp = require('../components/TutorialPopUp_android');

class LogInPage extends BasePage {

    constructor() {
        super();
        this.tutorialPopUp = new TutorialPopUp();
    };
 
    get logoImg () { return $('~logo_icon') };
    get emailField () { return $('(//android.widget.EditText[@content-desc="input_field"])[1]') };
    get inputPassword () { return $('(//android.widget.EditText[@content-desc="input_field"])[2]') };
    get passwordHideIcon () { return $('~password_toggle') };
    get signInButton () { return $('~sign_in_btn') };
    get signInLabel () { return $('~sign_in_title') };
    get forgotPasswordLink () { return $('~forgot_password') };
    get newToProReferralLink () { return $('~new_pro_ref_text') };
    get signUpLink () { return $('~sign_in_up_btn') };


    async loginWithCreds (login, password) {
        await this.enterCredsAndLogin(login, password);

        // Skip tutorial
        await this.tutorialPopUp.skipButtonClick();

        const tooltipMessage = await this.tooltip.text;
        // Confirm tooltip if displayed
        if (await tooltipMessage.isDisplayed()) {
            await this.tooltip.close();
        };
    };

    async enterCredsAndLogin(login, password) {
        const emailInputField = await Utils.wait.forDisplayed(this.emailField, 'Email field');
        const passwordInputField = await Utils.wait.forDisplayed(this.inputPassword, 'Password field');

        await emailInputField.setValue(login);
        await passwordInputField.setValue(password);
        await Utils.element.click(this.signInButton, 'Sign In button', this.animationTimeout);
    };

    async forgotPasswordLinkClick() {
        await Utils.element.click(this.forgotPasswordLink, 'Forgot Password link', this.animationTimeout);
    };

}
 
module.exports = LogInPage;