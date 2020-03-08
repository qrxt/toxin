import $ from "jquery";
import IMask from "imask";

import "air-datepicker/dist/css/datepicker.min.css";
import "air-datepicker/dist/js/datepicker";

const TypesEnum = Object.freeze({
  date: "date", text: "text"
});

const maskOptions = {
  mask: Date,
  autofix: true,
};

const datepicker = document
  .querySelectorAll(".js-input-text input");

const dateInputs = $(datepicker)
  .filter(`[data-interact=${ TypesEnum.date }]`);

$(dateInputs).each((_, dateInput) => {
  dateInput.type = TypesEnum.text;
  const dateInputMask = IMask(dateInput, maskOptions);

  const datePicker = $(dateInput)
    .datepicker();
});

