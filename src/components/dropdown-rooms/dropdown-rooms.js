import Dropdown from "../dropdown/dropdown";

export default class DropdownRooms extends Dropdown {
  init() {
    this.node
      .accordion(this.options);

    if (this.inputQuantities) {
      this.inputQuantities.each((_, quantity) => {
        const quantityLabel = $(quantity)
          .find(".input-quantity__label");
        const quantityControls = $(quantity)
          .find(".input-quantity__wrapper");

        quantityControls.on("click", evt => {
          console.log(
            quantityLabel.text(),
            quantityControls.find("input").val()
          )
        });
      })
    }
  }

  constructor(node, options) {
    super(node, options);

    this.inputQuantities = this.node
      .find(".input-quantity");

    this.inputs = this.node.find("input");
    this.labels = this.node.find(".input-quantity__label");

    this.init();
  }
}
