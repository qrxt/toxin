import $ from "jquery";

export default class TextField {
  init () {
    const { datepickerOptions } = this.options;

    this.nodeInput.get(0).type = "text";

    if (datepickerOptions) {
      this.nodeInput.datepicker(datepickerOptions);
    }
  }

  constructor (node, options) {
    this.node = node;
    this.nodeInput = $(this.node).find("input");
    this.options = options;
  }
}
