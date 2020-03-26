export default class Range {
  constructor (node, options) {
    this.node = node;
    this.options = options;

    console.log(
      this.node.attr("data-max")
    );
  }

  init () {
    this.node.slider(this.options);
  }
}
