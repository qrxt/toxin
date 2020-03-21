export default class Dropdown {
  constructor (node, options) {
    this.node = node;
    this.nodeText = this.node;
    this.options = options;
  }

  init () {
    const options = {
      header: ".dropdown__label",
      collapsible: true,
      active: false,

      autoHeight: false,
      clearStyle: true,

      ...this.options
    };

    this.node
      .accordion(options);
  }

  setText (text) {
    this.node
      .find(".dropdown__label")
      .text(text);
  }
}
