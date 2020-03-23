import $ from "jquery";

import Dropdown from "../dropdown/dropdown";

export default class DropdownGuests extends Dropdown {
  constructor (node, options) {
    super(node, options);

    this.label = this.node
      .find(".dropdown__label");
    this.inputQuantities = this.node
      .find(".input-quantity");
    this.labelText = this.label
      .find(".dropdown__label-text");

    this.controlWrappers = this.node.find(".input-quantity__wrapper");
    this.inputs = this.node.find("input");
    this.inputLabels = this.node.find(".input-quantity__label");
    this.submitBtn = this.node.find(".js-dropdown-submit");
  }

  init () {
    const options = {
      header: "p.dropdown__label",
      collapsible: true,
      active: false,

      ...this.options
    };

    this.node
      .accordion(options);

    this.submitBtn.on("click", () => {
      this._setLabelText(`${ this._getInputValuesSum() } гостя`);
    });
  }

  _getInputValues () {
    return $.map(this.inputs, input => {
      const inputValue = $(input).val();

      return Number(inputValue);
    });
  }

  _getInputValuesSum () {
    return this._getInputValues()
      .reduce((acc, inputValue) => acc + inputValue, 0);
  }

  _setLabelText (text) {
    this.labelText.text(text);
  }
}
