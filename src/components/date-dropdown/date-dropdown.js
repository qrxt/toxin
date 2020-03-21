import $ from "jquery";

export default class DateDropdown {
  constructor (node, options) {
    this.node = node;
    this.nodeInput = $(node).find("input");
    this.nodeText = $(node).find(".date-dropdown__text");
    this.options = options;
  }

  init () {
    const yOffset = this.node.get(0).scrollHeight + 7;
    const { startDate, startDateRange } = this.options;

    if (startDate) {
      const currentDay = startDate.getDate();
      const currentMonth = String(startDate.getMonth()).length < 2
        ? `0${ startDate.getMonth() + 1 }`
        : String(startDate.getMonth() + 1);
      const currentFullYear = startDate.getFullYear();
      const formattedDate = `${ currentDay }.${ currentMonth }.${ currentFullYear }`;

      this._setDate(formattedDate);
    }

    if (startDateRange) {
      this._setDate(startDateRange);
    }

    this.nodeInput
      .datepicker({
        ...this.options,

        offset: yOffset,
        onSelect: formattedDate => {
          this.nodeText.text(formattedDate.toLowerCase())
        }
      });

    this.nodeInput
      .get(0)
      .addEventListener("keydown", evt => {
        if (evt.key === "Enter") {
          evt.preventDefault();
        }
      });
  }

  _setDate (dateStr) {
    this.nodeInput.val(dateStr);
    this.nodeText.text(dateStr);
  }
}
