import $ from "jquery";

export default class Dropdown {
  init() {
    this.node
      .accordion(this.options);
  }

  constructor(node, options) {
    this.node = node;
    this.nodeText = this.node;
    this.options = options;

    this.init();
  }

  setText(text) {
    this.node
      .find(".dropdown__label")
      .text(text);
  }
}
