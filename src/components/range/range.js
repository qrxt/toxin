export default class Range {
  constructor (node, options) {
    this.node = node;

    this.rangeLabel = this.node.find(".labeled__status");
    this.sliderNode = this.node.find(".range__slider");

    this.options = {
      range: true,
      orientation: "horizontal",
      animate: true,

      unit: "",

      min: this.node.attr("data-min"),
      max: this.node.attr("data-max"),

      values: [
        this.node.attr("data-left"),
        this.node.attr("data-right")
      ],

      slide: (_, { values }) => {
        const [ left, right ] = values;

        this.setRangeLabel(left, right);
      },

      ...options
    };
  }

  init () {
    const { values } = this.options;
    const [ left, right ] = values;

    this.sliderNode.slider(this.options);

    this.setRangeLabel(left, right);
  }

  setRangeLabel (left, right) {
    const { unit } = this.options;
    const rangeLabelText = `${ left }${ unit } - ${ right }${ unit }`;

    this.rangeLabel.text(rangeLabelText);
  }
}
