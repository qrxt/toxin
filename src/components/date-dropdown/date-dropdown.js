import $ from "jquery";

export default class DateDropdown {
  init() {
    this.nodeInput.datepicker(this.options);
  }

  constructor(node, options) {
    this.node = node;
    this.nodeInput = $(node).find("input");
    this.options = options;

    this.init();
  }
};
