class NotificationPopUp {

    get logo() { return $('~notif_illustation') };
    get description() { return $('~notif_illustation_desc') };
    get sureButton() { return $('~sure_btn') };
    get noThanksButton() { return $('~no_thanks_btn') };

    async confirm() {
        const sureButton = await this.sureButton;
        if (await sureButton.isExisting()) {
            await sureButton.click();
        }
    };

}
 
module.exports = NotificationPopUp;