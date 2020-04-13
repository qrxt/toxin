import $ from "jquery";
import IMask from "imask";
import TextField from "./text-field";

export default class TextFieldMasked extends TextField {
  constructor (node, options) {
    super(node, options);

    this.nodeInput = $(this.node).find("input");

    const { maskOptions } = this.options;

    this.maskOptions = maskOptions;
    this.mask = new IMask(this.nodeInput.get(0), this.maskOptions);
  }
}
