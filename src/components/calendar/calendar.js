import $ from "jquery";

const arrowSvgHtml = `
  <svg width="20" height="20" aria-hidden="true">
    <use xlink:href="assets/img/sprite.svg#arrow_forward"></use>
  </svg>
`;

const getSubmitBtnTemplate = () => $("<button />", {
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

const getResetBtnTemplate = () => $("<button />", {
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

const getCalendarFooterTemplate = () => $("<div >", {
  class: "datepicker__footer",
  append: [
    getSubmitBtnTemplate(),
    getResetBtnTemplate()
  ]
});

export default class Calendar {
  constructor (nodes, options) {
    const { node, output } = nodes;

    this.node = node;
    this.nodeInput = this.node.find("input");
    this.output = output;
    this._datePlaceholder = "ДД.ММ.ГГГГ";

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

        if (!formattedDate) {
          this.output.text(this._datePlaceholder);
        }

        return formattedDate;
      },

      ...options
    };
  }

  init () {
    const datepicker = this.nodeInput.datepicker(this.options);
    const datepickerData = datepicker.data("datepicker");
    const datepickerElem = datepickerData.$datepicker;

    this.datepicker = datepickerData;

    const isDateSelected = () => this.options.range
      ? datepicker.data("datepicker").selectedDates.length >= 2
      : datepicker.data("datepicker").selectedDates.length >= 1;

    // Select start dates from options
    datepickerData.selectDate(this.options.startDates);

    datepickerElem.append(getCalendarFooterTemplate());

    const submitBtn = datepickerElem.find(".js-calendar-submit");
    const resetBtn = datepickerElem.find(".js-calendar-reset");

    this.nodeInput.get(0).type = "text";

    // Write selected dates to associated input on calendar init
    if (isDateSelected()) {
      this.nodeInput.val(this.formattedDate);
      resetBtn.show();
    }

    submitBtn.on("click", () => {
      if (isDateSelected()) {
        this.nodeInput.val(this.formattedDate);
        resetBtn.show();
      } else {
        this.output.text(this._datePlaceholder);

        return;
      }

      if (this.output) {
        this.output.text(this.formattedDate);
      }
    });

    resetBtn.on("click", () => {
      datepicker.data("datepicker").clear();
      resetBtn.hide();

      if (this.output) {
        this.output.text(this._datePlaceholder);
      }
    });

    datepicker.on("keypress", evt => {
      const IS_SPACEBAR = evt.keyCode === 32;

      if (IS_SPACEBAR) {
        evt.preventDefault();

        const focusedElems = datepickerElem.find(".datepicker--cell.-focus-");

        focusedElems.each((_, focused) => {
          if ($(focused).hasClass("-selected-")) {
            resetBtn.click();
          } else {
            focused.click();
            submitBtn.click();
          }
        });
      }
    });
  }
}
