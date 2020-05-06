import $ from "jquery";

import DateDropdown from "../date-dropdown/date-dropdown";
import GuestsDropdown from "../dropdown-guests/dropdown-guests";
import InputQuantity from "../input-quantity/input-quantity";
import Range from "../range/range";

const datesRangeDropdownElem = $(".js-page-catalog-dates-range");
const guestsDropdownElem = $(".js-page-catalog-guests");
const priceRangeElem = $(".js-page-catalog-price-range");

const formElems = [
  datesRangeDropdownElem,
  guestsDropdownElem,
  priceRangeElem
];

if (formElems.every(formElem => formElem.length > 0)) {
  // Dates Range Dropdown

  const datesRangeDropdown = new DateDropdown(datesRangeDropdownElem, {
    range: true,
    multipleDatesSeparator: " - ",
    dateFormat: "dd M",
    startDateRange: "19 авг - 23 авг"
  });

  datesRangeDropdown.init();

  // Guests Dropdown

  const guestsDropdown = new GuestsDropdown(guestsDropdownElem, {});

  guestsDropdown.init();

  const inputs = guestsDropdownElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }

  // Price range

  const priceRange = new Range(priceRangeElem, {
    min: 0,
    max: 15500,
    values: [ 5000, 10000 ],
    unit: "₽"
  });

  priceRange.init();
}

