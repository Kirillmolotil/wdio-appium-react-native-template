class ErrorPopUp {

    get title () { return $('~center_modal_title') };
    get message () { return $('~center_modal_desc') };
    get submitButton () { return $('~center_modal_btn') };

  }
  
  module.exports = ErrorPopUp;
