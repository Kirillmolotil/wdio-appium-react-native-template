class DataGenerator {

    /**
   * Create random text with the specified length from the set of characters.
   *
   * @param characterLength
   * @returns {String}
   */
  getRandomString (characterLength) {
    let randomText = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charSetLength = possible.length;
    for (let i = 0; i < characterLength; i++)
      randomText += possible.charAt(Math.floor(Math.random() * charSetLength));
    return randomText;
  };

};

module.exports = DataGenerator;