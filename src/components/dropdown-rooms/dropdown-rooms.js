import $ from "jquery";

import Dropdown from "../dropdown/dropdown";

const constructStatusString = (labels, inputValues, elementsQuantity = 2) => {
  const statusString = labels
    .slice(0, elementsQuantity)
    .reduce((acc, labelText, index) =>
      [
        ...acc,
        `${ inputValues[index] } ${ labelText }`
      ], [])
    .join(", ")
    .concat("...");

  return statusString;
};

export default class DropdownRooms extends Dropdown {
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
  }

  init () {
    const options = {
      header: "p.dropdown__label",
      collapsible: true,
      active: false,

      ...this.options
    };

    const inputValues = this._getInputValues();

    this.node
      .accordion(options);

    const labels = $.map(this.inputLabels, label =>
      $(label).text());

    if (this.controlWrappers) {
      this.controlWrappers
        .on("click input", () => {
          this._setLabelText(
            constructStatusString(labels, this._getInputValues(), 2)
          );
        });
    }

    if (inputValues.some(inputValue => inputValue !== 0)) {
      this._setLabelText(
        constructStatusString(labels, inputValues, 2)
      );
    }
  }

  _getInputValues () {
    return $.map(this.inputs, input => {
      const inputValue = $(input).val();

      return Number(inputValue);
    });
  }

  _setLabelText (text) {
    this.labelText.text(text);
  }
}
