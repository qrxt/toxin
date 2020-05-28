import TextFieldMasked from "../text-field/text-field-masked";

export default class CardSignUp {
  constructor (node) {
    this.node = node;
  }

  init () {
    const maskedDateTextFieldElem = this.node
      .find(".js-masked-date");

    if (maskedDateTextFieldElem.length > 0) {
      const node = maskedDateTextFieldElem.get(0);

      node.addEventListener("keydown", evt => {
        if (evt.key === "Enter") {
          evt.preventDefault();
        }
      });

      const maskOptions = {
        mask: Date
      };

      const maskedDateTextField = new TextFieldMasked(node, {
        maskOptions, datepickerOptions: {}
      });

      maskedDateTextField.init();
    }
  }
}
