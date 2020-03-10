import $ from "jquery";

export default class Dropdown {
  init() {
    this.node
      .accordion(this.options);
  }

  constructor(node, options) {
    this.node = node;
    this.options = options;

    this.init();
  }
}
