import $ from "jquery";

const arrowSvgHtml = `
  <svg width="20" height="20" aria-hidden="true">
    <use xlink:href="assets/img/sprite.svg#arrow_forward"></use>
  </svg>
`;

const submitBtnTemplate = $("<button />", {
  class: [
    "btn",
    "btn--transparent",
    "datepicker__custom-btn",
    "datepicker__btn-submit",
    "js-calendar-submit"
  ].join(" "),
  type: "button",
  append: "Применить"
});

const resetBtnTemplate = $("<button />", {
  class: [
    "btn",
    "btn--transparent",
    "datepicker__custom-btn",
    "datepicker__btn-reset",
    "js-calendar-reset"
  ].join(" "),
  type: "button",
  append: "Очистить"
});

const calendarFooterTemplate = $("<div >", {
  class: "datepicker__footer",
  append: [
    submitBtnTemplate,
    resetBtnTemplate
  ]
});

export default class Calendar {
  constructor (node, options) {
    this.node = node;
    this.nodeInput = this.node.find("input");

    this.options = {
      keyboardNav: true,
      navTitles: {
        days: "MM yyyy"
      },
      prevHtml: arrowSvgHtml,
      nextHtml: arrowSvgHtml,

      onSelect: formattedDate => {
        this.nodeInput.val("");
        this.formattedDate = formattedDate;
      },

      ...options
    };
  }

  init () {
    const datepicker = this.nodeInput.datepicker(this.options);
    const submitBtn = this.node.find(".js-calendar-submit");
    const resetBtn = this.node.find(".js-calendar-reset");

    const isDateSelected = () => this.options.range
      ? datepicker.data("datepicker").selectedDates.length === 2
      : datepicker.data("datepicker").selectedDates.length === 1;

    const writeToInput = () => {
      if (isDateSelected()) {
        this.nodeInput.val(this.formattedDate);
        resetBtn.show();
      }
    };

    // Select start dates from options
    datepicker.data("datepicker")
      .selectDate(this.options.startDates);

    this.node.find(".datepicker")
      .append(calendarFooterTemplate);

    this.nodeInput.get(0).type = "text";

    // Write selected dates to associated input
    writeToInput();

    submitBtn.on("click", () => {
      alert();
      writeToInput();
    });

    resetBtn.on("click", () => {
      datepicker.data("datepicker").clear();
      resetBtn.hide();
    });
  }
}
