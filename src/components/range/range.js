export default class Range {
  constructor (node, options) {
    this.node = node;
    this.options = {
      range: true,
      orientation: "horizontal",
      animate: true,

      min: this.node.attr("data-min"),
      max: this.node.attr("data-max"),

      values: [
        this.node.attr("data-left"),
        this.node.attr("data-right")
      ],

      ...options
    };
  }

  init () {
    this.node.slider(this.options);
  }
}
