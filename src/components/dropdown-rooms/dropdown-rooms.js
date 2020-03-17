import Dropdown from "../dropdown/dropdown";

export default class DropdownRooms extends Dropdown {
  init() {
    const options = {
      header: "p.dropdown__label",
      collapsible: true,

      ...this.options,
    };

    const inputValues = this._getInputValues();

    this.node
      .accordion(options);

    const labels = $.map(this.inputLabels, label => {
      return $(label).text();
    });

    if (this.controlWrappers) {
      this.controlWrappers
        .on("click input", () => {
          this._setLabelText(
            this._constructStatusString(labels, this._getInputValues(), 2)
          );
        });
    }

    if (inputValues.some(inputValue => inputValue !== 0)) {
      this._setLabelText(
        this._constructStatusString(labels, inputValues, 2)
      );
    }
  }

  _getInputValues() {
    return $.map(this.inputs, input => {
      const inputValue = $(input).val();
      return Number(inputValue);
    });
  }

  _constructStatusString(labels, inputValues, elementsQuantity = 2) {
    const statusString = labels
      .slice(0, elementsQuantity)
      .reduce((acc, labelText, index) => {
        return [
          ...acc,
          `${ inputValues[index] } ${ labelText }`
        ];
      }, [])
      .join(", ")
      .concat("...");

    return statusString;
  }

  _setLabelText(text) {
    this.labelText.text(text);
  }

  constructor(node, options) {
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

    this.init();
  }
}
