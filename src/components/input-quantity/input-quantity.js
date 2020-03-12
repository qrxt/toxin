export default class inputQuantity {
  init() {
    const { incBtn, decBtn } = this;

    incBtn.on("click", () => {
      this.inc()
    });

    decBtn.on("click", () => {
      this.dec()
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
    this.inputNode.val(currentValue + 1);
  }

  dec() {
    const currentValue = Number(this.inputNode.val());
    this.inputNode.val(currentValue - 1);
  }
}
