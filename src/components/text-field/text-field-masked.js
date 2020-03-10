import IMask from "imask";

import TextField from "./text-field";

import "air-datepicker/dist/css/datepicker.min.css";
import "air-datepicker/dist/js/datepicker";

export default class TextFieldMasked extends TextField {
  constructor(node, options) {
    super(node, options);

    this.nodeInput = $(this.node).find("input");

    const { maskOptions } = this.options;
    this.maskOptions = maskOptions;
    this.mask = IMask(this.nodeInput.get(0), this.maskOptions);
  }
}
