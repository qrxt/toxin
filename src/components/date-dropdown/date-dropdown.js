import $ from "jquery";

import Calendar from "@components/calendar/calendar";

export default class DateDropdown {
  constructor (node, options) {
    this.node = node;
    this.nodeInput = this.node.find("input");
    this.nodeText = $(node).find(".date-dropdown__text");
    this.options = options;
  }

  init () {
    const yOffset = this.node.get(0).scrollHeight + 7;

    this.nodeInput.prop("type", "text");

    const calendar = new Calendar({
      node: this.node,
      output: this.nodeText
    }, {
      offset: yOffset,
      outputNode: this.nodeText,

      ...this.options
    });

    $.when(calendar.init())
      .then(() => {
        this.nodeText
          .removeClass("visually-hidden visually-hidden--always");

        if (this.options.startDate) {
          const currentDay = this.options.startDate.getDate();
          const currentMonth = String(this.options.startDate.getMonth()).length < 2
            ? `0${ this.options.startDate.getMonth() + 1 }`
            : String(this.options.startDate.getMonth() + 1);
          const currentFullYear = this.options.startDate.getFullYear();
          const formattedDate = `${ currentDay }.${ currentMonth }.${ currentFullYear }`;

          this._setDate(formattedDate);
        }

        if (this.options.startDateRange) {
          this._setDate(this.options.startDateRange);
        }
      });

    this.datepicker = calendar.datepicker;

    this.nodeInput
      .get(0)
      .addEventListener("keydown", evt => {
        if (evt.key === "Enter") {
          evt.preventDefault();
        }
      });
  }

  _setDate (dateStr) {
    this.nodeInput.get(0).value = dateStr;
    this.nodeText.text(dateStr);
  }

  get selected () {
    return this.options.range
      ? this.datepicker.selectedDates
      : this.datepicker.selectedDates[0];
  }
}
