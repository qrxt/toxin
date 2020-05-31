import $ from "jquery";

import Calendar from "@components/calendar/calendar";

export default class TextField {
  constructor (node, options) {
    this.node = node;
    this.nodeInput = $(this.node).find("input");
    this.options = options;
  }

  init () {
    const { datepickerOptions } = this.options;
    const textFieldInput = this.nodeInput.get(0);

    textFieldInput.type = "text";

    if (datepickerOptions) {
      const calendar = new Calendar({
        node: $(this.node),
        output: this.nodeText
      }, {
        outputNode: this.nodeText,

        ...this.options
      });

      calendar.init();

      textFieldInput.placeholder = "ДД.ММ.ГГГГ";
    }
  }
}
