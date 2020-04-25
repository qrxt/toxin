import $ from "jquery";

import BtnBurger from "@components/btn-burger/btn-burger";
import DropdownDate from "@components/date-dropdown/date-dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import InputQuantity from "@components/input-quantity/input-quantity";

// Burger Btn

const burgerBtnElem = $(".js-page-landing-header-burger-btn");

if (burgerBtnElem.length > 0) {
  const burgerBtn = new BtnBurger(burgerBtnElem);

  burgerBtn.init();
}

// Date Dropdowns

const arrivalDateDropdownElem = $(".js-page-landing-arrival");
const checkOutDateDropdownElem = $(".js-page-landing-check-out");

if (arrivalDateDropdownElem.length > 0 && checkOutDateDropdownElem.length > 0) {
  const arrivalDateDropdown = new DropdownDate(arrivalDateDropdownElem, {});
  const checkOutDateDropdown = new DropdownDate(checkOutDateDropdownElem, {});

  arrivalDateDropdown.init();
  checkOutDateDropdown.init();
}

// Guests Dropdown

const guestsDropdownElem = $(".js-page-landing-hotel-guests");

if (guestsDropdownElem.length > 0) {
  const guestsDropdown = new DropdownGuests(guestsDropdownElem, {});

  guestsDropdown.init();

  const inputs = guestsDropdownElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}
