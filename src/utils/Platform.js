class Platform {

    constructor() {
        this.platformVersion = browser.config.params.platformVersion;
        this.deviceType = browser.config.params.deviceType;
    };

    /**
     * Check platform version
     * @param {String} platform // ios|android
     * @param {String} version
     */
    is (platform, version) {
        return this.deviceType === platform && this.platformVersion.startsWith(version);
    };

}

module.exports = Platform;