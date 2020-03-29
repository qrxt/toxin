import $ from "jquery";

import Dropdown from "../dropdown/dropdown";

export default class DropdownGuests extends Dropdown {
  constructor (node, options) {
    super(node, options);

    this.label = this.node
      .find(".dropdown__label");
    this.inputQuantities = this.node
      .find(".input-quantity input");
    this.labelText = this.label
      .find(".dropdown__label-text");

    this.controlWrappers = this.node.find(".input-quantity__wrapper");
    this.inputs = this.node.find("input");
    this.inputLabels = this.node.find(".input-quantity__label");
    this.submitBtn = this.node.find(".js-dropdown-submit");
    this.resetBtn = this.node.find(".js-dropdown-reset");
  }

  init () {
    const options = {
      header: "p.dropdown__label",
      collapsible: true,
      active: false,

      ...this.options
    };

    const getGuestsQuantityString = () =>
      `${ this._getInputValuesSum() } гостя`;

    this.node
      .accordion(options);

    this.submitBtn.on("click", () => {
      this._setLabelText(getGuestsQuantityString());

      if (this._getInputValuesSum() > 0) {
        this.resetBtn.addClass("dropdown__btn-reset--active");
      }
    });

    this.resetBtn.on("click", () => {
      this.inputQuantities.each((_, input) => {
        $(input).val(0);
      });

      this._setLabelText(getGuestsQuantityString());
      this.resetBtn.removeClass("dropdown__btn-reset--active");
    });

    if (this._getInputValuesSum() > 0) {
      this._setLabelText(getGuestsQuantityString);
    }

    if (this._getInputValuesSum() > 0) {
      this.resetBtn.addClass("dropdown__btn-reset--active");
    }
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
