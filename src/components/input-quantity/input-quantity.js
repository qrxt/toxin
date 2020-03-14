export default class inputQuantity {
  init() {
    const { incBtn, decBtn, inputNode } = this;

    incBtn.on("click", () => {
      this.inc();
    });

    decBtn.on("click", () => {
      this.dec();
    });

    inputNode.on("input", evt => {
      const currentVal = evt.target.value;

      this._setInputVal(currentVal);
    });
  }

  constructor(node) {
    this.node = node;

    this.decBtn = this.node.find(".js-btn-dec");
    this.incBtn = this.node.find(".js-btn-inc");

    this.inputNode = this.node.find("input");

    this.init();
  }

  inc() {
    const currentValue = Number(this.inputNode.val());

    this._setInputVal(currentValue + 1);
  }

  dec() {
    const currentValue = Number(this.inputNode.val());

    this._setInputVal(currentValue - 1);
  }

  _setInputVal(val) {
    const inputMin = Number(this.inputNode.attr("min"));
    const inputMax = Number(this.inputNode.attr("max"));

    if (val < inputMin) {
      this.inputNode.val(inputMin);
    } else if (val > inputMax) {
      this.inputNode.val(inputMax);
    } else {
      this.inputNode.val(val);
    }
  }
}
