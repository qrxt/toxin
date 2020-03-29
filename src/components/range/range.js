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

    this.leftInput.change(evt => {
      const LEFT = 0;
      const normalizedValue = normalizeInputValue(min, this.rightInput.val(), evt.target.value);

      this.leftInput.val(normalizedValue);
      this.rightInput.attr("max", normalizedValue);
      this.sliderNode.slider("values", LEFT, evt.target.value);
    });

    this.rightInput.change(evt => {
      const RIGHT = 1;
      const normalizedValue = normalizeInputValue(this.leftInput.val(), max, evt.target.value);

      this.rightInput.val(normalizedValue);
      this.leftInput.attr("max", normalizedValue);
      this.sliderNode.slider("values", RIGHT, evt.target.value);
    });
  }

  setLeftInputValue (value) {
    this.leftInput.val(value);
  }

  setRightInputValue (value) {
    this.rightInput.val(value);
  }
}
