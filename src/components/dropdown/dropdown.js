import $ from "jquery";

export default class Dropdown {
  init() {
    const options = {
      header: "p.dropdown__label",
      collapsible: true,

      autoHeight: false,
      clearStyle: true,

      ...this.options,
    };

    this.node
      .accordion(options);
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
