const World = require("../../../src/po/World");
const userData = require("../../../src/data/user-data");
const { screen } = require('../../../constants/screen');
const Utils = require('../../../src/utils/Utils');
const chai = require('chai');  
const expect = chai.expect;
const { addFeature, addStory, addArgument } = require('@wdio/allure-reporter').default;

describe('Sign In page', () => {
    addStory('Sign In page tests');
    describe('elements:', () => {
        it('ProReferral power by The Home Depot logo', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const logo = await Utils.wait.forDisplayed(World.logInPage.logoImg, 'Logo');

            expect(await logo.isDisplayed(), 'Logo is displayed').to.be.true;
        });

        it('Sign In title', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const signInTitle = await Utils.wait.forDisplayed(World.logInPage.signInLabel, 'Sign In title');

            expect(await signInTitle.isDisplayed(), 'Sign In title is displayed').to.be.true;
            expect(await signInTitle.getText(), 'Sign In title text').to.equal("Sign In");
        });

        it('Email field', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const emailInputField = await Utils.wait.forDisplayed(World.logInPage.emailField, 'Email field');

            expect(await emailInputField.isDisplayed(), 'Email field is displayed').to.be.true;
        });

        it('Password field', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const inputPassword = await Utils.wait.forDisplayed(World.logInPage.inputPassword, 'Email field');

            expect(await inputPassword.isDisplayed(), 'Email field is displayed').to.be.true;
        });

        it('Password Hide icon', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const passwordHideIcon = await Utils.wait.forDisplayed(World.logInPage.passwordHideIcon, 'Show/Hide password icon');

            expect(await passwordHideIcon.isDisplayed(), 'Show/Hide password icon is displayed').to.be.true;
        });

        it('Sign In button', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const signInButton = await Utils.wait.forDisplayed(World.logInPage.signInButton, 'Sign In button');

            expect(await signInButton.isDisplayed(), 'Sign In button is displayed').to.be.true;
        });

        it('Forgot Password link', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const forgotPasswordLink = await Utils.wait.forDisplayed(World.logInPage.forgotPasswordLink, 'Forgot Password? link');

            expect(await forgotPasswordLink.isDisplayed(), 'Forgot Password? link is displayed').to.be.true;
            expect(await Utils.element.getText(forgotPasswordLink), 'Link text').to.equal("Forgot password?");
        });

        it('"New To Pro Referral" label', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const newToProReferralLink = await Utils.wait.forDisplayed(World.logInPage.newToProReferralLink, 'Footer text');

            expect(await newToProReferralLink.isDisplayed(), 'Footer text is displayed').to.be.true;
            expect(await newToProReferralLink.getText(), 'Footer text').to.equal('New to Pro Referral? ');
        });

        it('Sign Up link', async () => {
            addFeature('User is able to see elements on Sign In page');
            addArgument('Priority', 'P0');

            const signUpLink = await Utils.wait.forDisplayed(World.logInPage.signUpLink, 'Sign Up link');

            expect(await signUpLink.isDisplayed(), 'Sign Up link is displayed').to.be.true;
            expect(await Utils.element.getText(signUpLink)).to.equal('Sign Up');            
        });
    });

    describe('Sign In tests:', () => {
        beforeEach( async () => {
            await browser.reloadSession();
        });

        it('User is able to see Error Popup when he try to log in with invalid E-mail and valid Password', async () => {
            addFeature('Sign In flow');
            addArgument('Priority', 'P0');

            const emailInputField = await Utils.wait.forDisplayed(World.logInPage.emailField, 'Email field');
            const passwordInputField = await Utils.wait.forDisplayed(World.logInPage.inputPassword, 'Password field');

            await emailInputField.setValue("invalidEmail@invalid.com");
            await passwordInputField.setValue(userData.users.USER_ONE.password);
            await Utils.element.click(World.logInPage.signInButton, 'Sign In button');

            const errorPopupTitle = await Utils.wait.forDisplayed(World.logInPage.errorPopUp.title, 'Error title');
            const errorPopupMessage = await Utils.wait.forDisplayed(World.logInPage.errorPopUp.message, 'Error message');
            const errorPopupTryAgainButton = await Utils.wait.forDisplayed(World.logInPage.errorPopUp.submitButton, 'Submit button');

            expect(await errorPopupTitle.getText(), 'Error pop up header text').to.equal('Sign In Failed');
            expect(await errorPopupMessage.getText(), 'Error pop up message text').to.equal('Your email or password is incorrect. Please try again.');
            expect(await errorPopupTryAgainButton.isDisplayed(), '"Try again" button is displayed');
            expect(await Utils.element.getXLocation(errorPopupTitle), 'Error pop up header text position').to.equal(screen.CENTER);
            expect(await Utils.element.getXLocation(errorPopupMessage), 'Error pop up message text position').to.equal(screen.CENTER);
            expect(await Utils.element.getXLocation(errorPopupTryAgainButton), '"Try again" button position').to.equal(screen.CENTER);
        });

        it('User is able to click on Try Again Button on Error Popup after entering invalid E-mail with valid Login', async () => {
            addFeature('Sign In flow');
            addArgument('Priority', 'P0');

            const emailInputField = await Utils.wait.forDisplayed(World.logInPage.emailField, 'Email field');
            const passwordInputField = await Utils.wait.forDisplayed(World.logInPage.inputPassword, 'Password field');

            await emailInputField.setValue("invalidEmail@invalid.com");
            await passwordInputField.setValue(userData.users.USER_ONE.password);
            await Utils.element.click(World.logInPage.signInButton, 'Sign In button');
            await Utils.element.click(World.logInPage.errorPopUp.submitButton, 'Submit button');

            const proReferralLogo = await Utils.wait.forDisplayed(World.logInPage.logoImg, 'Pro Referral Logo');

            expect(await proReferralLogo.isDisplayed(), 'Pro Referral Logo is displayed').to.be.true;
            expect(await Utils.element.isExisting(World.logInPage.errorPopUp.submitButton), 'Error pop up is existing').to.be.false;
        });

        it('User is able to log in to the Application with valid credentials', async () => {
            addFeature('Sign In flow');
            addArgument('Priority', 'P0');

            await World.logInPage.loginWithCreds(userData.users.USER_ONE.login, userData.users.USER_ONE.password);
            const title = await Utils.wait.forDisplayed(World.jobsListPage.title, 'Jobs title');

            expect(await Utils.element.getText(title), 'Title text').to.equal('Jobs');
        });
    });
});