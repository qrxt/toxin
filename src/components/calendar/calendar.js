import $ from "jquery";

const arrowSvgHtml = `
  <svg width="20" height="20" aria-hidden="true">
    <use xlink:href="assets/img/sprite.svg#arrow_forward"></use>
  </svg>
`;

const submitBtn = $("<button />", {
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

const resetBtn = $("<button />", {
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

const calendarFooter = $("<div >", {
  class: "datepicker__footer",
  append: [
    submitBtn,
    resetBtn
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

      dateFormat: "_",

      ...options
    };
  }

  init () {
    const datepicker = this.nodeInput.datepicker(this.options);

    datepicker.data("datepicker")
      .selectDate(this.options.startDates);

    this.node.find(".datepicker")
      .append(calendarFooter);

    this.nodeInput.get(0).type = "text";

    const submitBtn = this.node.find(".js-calendar-submit");
    const resetBtn = this.node.find(".js-calendar-reset");

    // submitBtn.on("click", () => {

    // });

    resetBtn.on("click", () => {
      datepicker.data("datepicker")
        .clear();
    });
  }
}
