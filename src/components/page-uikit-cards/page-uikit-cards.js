import $ from "jquery";

import DateDropdown from "@components/date-dropdown/date-dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import InputQuantity from "@components/input-quantity/input-quantity";
import TextFieldMasked from "@components/text-field/text-field-masked";

const hotelCardArrivalElem = $(".js-uikit-cards-arrival");
const hotelCardCheckOutElem = $(".js-uikit-cards-check-out");

// Карточка "подобрать номер"
if (hotelCardArrivalElem.length > 0 && hotelCardCheckOutElem.length > 0) {
  const hotelCardArrival = new DateDropdown(hotelCardArrivalElem, {});
  const hotelCardCheckOut = new DateDropdown(hotelCardCheckOutElem, {});

  hotelCardArrival.init();
  hotelCardCheckOut.init();
}

const hotelCardGuestsElem = $(".js-uikit-cards-hotel-guests");

if (hotelCardGuestsElem.length > 0) {
  const hotelCardGuests = new DropdownGuests(hotelCardGuestsElem, {});

  hotelCardGuests.init();

  const inputs = hotelCardGuestsElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}

// Карточка "регистрация аккаунта"
const maskedDateTextFieldElem = $(".js-uikit-cards-masked-date");

if (maskedDateTextFieldElem.length > 0) {
  const node = maskedDateTextFieldElem.get(0);

  node.addEventListener("keydown", evt => {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
  });

  const maskOptions = {
    mask: Date
  };

  const maskedDateTextField = new TextFieldMasked(node, {
    maskOptions, datepickerOptions: {}
  });

  maskedDateTextField.init();
}

// Карточка "Бронирование номера" (№888)
const bookCardArrivalElem = $(".js-uikit-cards-book-arrival");
const bookCardCheckOutElem = $(".js-uikit-cards-book-check-out");

if (bookCardArrivalElem.length > 0 && bookCardCheckOutElem.length > 0) {
  const bookCardArrival = new DateDropdown(bookCardArrivalElem, {
    startDate: new Date("August 19, 2019")
  });
  const bookCardCheckOut = new DateDropdown(bookCardCheckOutElem, {
    startDate: new Date("August 23, 2019")
  });

  bookCardArrival.init();
  bookCardCheckOut.init();
}

const bookCardGuestsElem = $(".js-uikit-cards-book-guests");

if (bookCardGuestsElem.length > 0) {
  const bookCardGuests = new DropdownGuests(bookCardGuestsElem, {});

  bookCardGuests.init();

  const inputs = bookCardGuestsElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}

// Карточка календаря

const calendarInputElem = $(".js-uikit-cards-calendar");

if (calendarInputElem.length > 0) {
  const node = calendarInputElem.get(0);

  node.addEventListener("keydown", evt => {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
  });

  const maskOptions = {
    mask: Date
  };

  const arrowSvgHtml = `
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="assets/img/sprite.svg#arrow_forward"></use>
    </svg>
  `;

  const datepickerOptions = {
    range: true,
    inline: true,
    keyboardNav: true,
    navTitles: {
      days: "MM yyyy"
    },
    startDate: new Date("August 19, 2019"),
    prevHtml: arrowSvgHtml,
    nextHtml: arrowSvgHtml
  };

  const calendar = new TextFieldMasked(node, {
    maskOptions, datepickerOptions
  });

  calendar.init();
}
