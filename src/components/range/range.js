export default class Range {
  constructor (node, options) {
    this.node = node;
    this.sliderNode = this.node.find(".range__slider")
      .slider(this.options);

    this.leftInput = this.node.find("input[data-side='left']");
    this.rightInput = this.node.find("input[data-side='right']");

    this.options = {
      range: true,
      orientation: "horizontal",
      animate: true,

      unit: "",
      step: 500,

      min: this.node.attr("data-min"),
      max: this.node.attr("data-max"),

      values: [
        this.node.attr("data-left"),
        this.node.attr("data-right")
      ],

      slide: (_, { values }) => {
        const [ left, right ] = values;

        this.setLeftInputValue(left);
        this.setRightInputValue(right);
      },

      ...options
    };
  }

  init () {
    const { values } = this.options;
    const [ left, right ] = values;

    this.setLeftInputValue(left);
    this.setRightInputValue(right);

    this.leftInput.change(evt => {
      const LEFT = 0;

      this.sliderNode.slider
        .values(LEFT, evt.target.value);
    });
  }

  setLeftInputValue (value) {
    this.leftInput.val(value);
  }

  setRightInputValue (value) {
    this.rightInput.val(value);
  }
}
