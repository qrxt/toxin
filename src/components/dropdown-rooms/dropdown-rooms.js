import Dropdown from "../dropdown/dropdown";

export default class DropdownRooms extends Dropdown {
  init() {
    this.node
      .accordion(this.options);

    if (this.controlWrappers) {
      this.controlWrappers
        .on("click input", () => {
          this._setLabelText(
            this._constructStatusString()
          )
        });
    }
  }

  _constructStatusString() {
    const inputValues = $.map(this.inputs, input => {
      const inputValue = $(input).val();
      return Number(inputValue);
    });

    const labels = $.map(this.inputLabels, label => {
      return $(label).text();
    });

    const statusString = labels
      .reduce((acc, labelText, index) => {
        return [
          ...acc,
          `${ labelText }: ${ inputValues[index] }`
        ];
      }, [])
      .join(", ");

    return statusString;
  }

  _setLabelText(text) {
    this.label
      .text(text);
  }

  constructor(node, options) {
    super(node, options);

    this.label = this.node
      .find(".dropdown__label");
    this.inputQuantities = this.node
      .find(".input-quantity");

    this.controlWrappers = this.node.find(".input-quantity__wrapper");
    this.inputs = this.node.find("input");
    this.inputLabels = this.node.find(".input-quantity__label");

    this.init();
  }
}
