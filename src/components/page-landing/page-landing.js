import $ from "jquery";

import CardSignUp from "../card-sign-up/card-sign-up";
import DropdownDate from "@components/date-dropdown/date-dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import Header from "@components/header/header";
import InputQuantity from "@components/input-quantity/input-quantity";

$(document).ready(() => {
  // Form Hotel Room Search

  const pageHeaderElem = $(".js-page-landing-header");
  const arrivalDateDropdownElem = $(".js-page-landing-arrival");
  const checkOutDateDropdownElem = $(".js-page-landing-check-out");

  const guestsDropdownElem = $(".js-page-landing-hotel-guests");

  const hotelRoomSearchForm = $(".js-hotel-room-search-form");
  const hotelRoomSearchSubmitBtn = $(".js-hotel-room-search-submit");

  const cardSignUpElem = $(".js-page-landing-sign-up");

  const formElements = [
    pageHeaderElem,
    arrivalDateDropdownElem,
    checkOutDateDropdownElem,
    cardSignUpElem,
    guestsDropdownElem,
    hotelRoomSearchForm,
    hotelRoomSearchSubmitBtn
  ];

  if (formElements.every(el => el.length > 0)) {
    // Page Header

    const pageHeader = new Header(pageHeaderElem);

    pageHeader.init();

    // Card Sign Up

    const cardSignUp = new CardSignUp(cardSignUpElem);

    cardSignUp.init();

    // Date Dropdowns

    const arrivalDateDropdown = new DropdownDate(arrivalDateDropdownElem, {});
    const checkOutDateDropdown = new DropdownDate(checkOutDateDropdownElem, {});

    arrivalDateDropdown.init();
    checkOutDateDropdown.init();

    // Guests Dropdown

    const guestsDropdown = new DropdownGuests(guestsDropdownElem, {});

    guestsDropdown.init();

    const inputs = guestsDropdownElem.find(".input-quantity");

    if (inputs.length > 0) {
      inputs.each((_, input) => {
        const inputQuantity = new InputQuantity($(input));

        inputQuantity.init();
      });
    }

    // Submit btn logic

    hotelRoomSearchSubmitBtn.on("click", () => {
      guestsDropdown.open();

      const arrivalInputValue = arrivalDateDropdown.nodeInput.val();
      const checkOutInputValue = checkOutDateDropdown.nodeInput.val();

      const isInputsRequired = arrivalDateDropdown.nodeInput.prop("required") && checkOutDateDropdown.nodeInput.prop("required");
      const isInputsFilled = arrivalInputValue.length > 0 && checkOutInputValue.length > 0;
      const isDatesRangeCorrect = arrivalDateDropdown.selected <= checkOutDateDropdown.selected;

      if (isInputsRequired && !isInputsFilled) {
        arrivalDateDropdown.nodeInput.get(0)
          .setCustomValidity("Выбор даты является обязательным");
      } else if (!isDatesRangeCorrect) {
        arrivalDateDropdown.nodeInput.get(0)
          .setCustomValidity("Дата въезда не может быть позже, чем дата выезда");
      } else {
        arrivalDateDropdown.nodeInput.get(0)
          .setCustomValidity("");
      }
    });
  }
});
