const normalizeInputValue = (min, max, value) => {
  if (value < min) {
    return min;
  }

  return value > max
    ? max
    : value;
};

export default class Range {
  constructor (node, options) {
    this.node = node;
    this.sliderNode = this.node.find(".range__slider");

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

        this.leftInput.attr("max", right);
        this.rightInput.attr("min", left);
      },

      ...options
    };
  }

  init () {
    const { values, min, max } = this.options;
    const [ left, right ] = values;

    this.sliderNode.slider(this.options);

    this.setLeftInputValue(left);
    this.setRightInputValue(right);

    this.leftInput.attr("min", min);
    this.rightInput.attr("max", max);

    this.leftInput.change(() => {
      const LEFT = 0;

      const value = Number(this.leftInput.val());
      const minInputValue = Number(this.leftInput.attr("min"));
      const maxInputValue = Number(this.leftInput.attr("max"));
      const normalizedValue = normalizeInputValue(
        minInputValue, maxInputValue, value
      );

      this.leftInput.val(normalizedValue);
      this.rightInput.attr("min", normalizedValue);
      this.sliderNode.slider("values", LEFT, normalizedValue);
    });

    this.rightInput.change(() => {
      const RIGHT = 1;

      const val = Number(this.rightInput.val());
      const minInputValue = Number(this.rightInput.attr("min"));
      const maxInputValue = Number(this.rightInput.attr("max"));
      const normalizedValue = normalizeInputValue(
        minInputValue, maxInputValue, val
      );

      this.rightInput.val(normalizedValue);
      this.leftInput.attr("max", normalizedValue);
      this.sliderNode.slider("values", RIGHT, normalizedValue);
    });
  }

  setLeftInputValue (value) {
    this.leftInput.val(value);
  }

  setRightInputValue (value) {
    this.rightInput.val(value);
  }
}
