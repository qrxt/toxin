import $ from "jquery";

import DropdownDate from "../date-dropdown/date-dropdown";
import DropdownGuests from "../dropdown-guests/dropdown-guests";
import InputQuantity from "../input-quantity/input-quantity";

export default class CardHotelRoom {
  constructor (node, options) {
    this.node = node;

    this.arrivalNode = this.node.find(".js-dropdown-date-arrival");
    this.checkoutNode = this.node.find(".js-dropdown-date-checkout");
    this.guestsDropdownNode = this.node.find(".js-dropdown-guests");
    this.submitBtn = this.node.find(".js-submit-btn");

    this.arrivalNodeInput = this.arrivalNode.find("input");
    this.checkoutNodeInput = this.checkoutNode.find("input");

    this.options = {
      guestsDropdownOptions: {},

      arrivalDateDropdownOptions: {},
      checkoutDateDropdownOptions: {},

      ...options
    };
  }

  init () {
    // Date Dropdowns

    const bookCardArrival = new DropdownDate(
      this.arrivalNode,
      this.options.arrivalDateDropdownOptions
    );

    const bookCardCheckout = new DropdownDate(
      this.checkoutNode,
      this.options.checkoutDateDropdownOptions
    );

    bookCardArrival.init();
    bookCardCheckout.init();

    // Fix Datepickers "Selected"

    const isArrivalDateOptionsEmpty = $.isEmptyObject(this.options.arrivalDateDropdownOptions);
    const isCheckoutDateOptionsEmpty = $.isEmptyObject(this.options.checkoutDateDropdownOptions);

    if (!isArrivalDateOptionsEmpty && !isCheckoutDateOptionsEmpty) {
      const arrivalDay = this.options.arrivalDateDropdownOptions.startDate.getDate();
      const arrivalMonth = this.options.checkoutDateDropdownOptions.startDate.getMonth();

      const currentArrivalDayDatepickerBtn = bookCardArrival
        .datepicker
        .$datepicker
        .find(`.datepicker--cell.datepicker--cell-day[data-date='${ arrivalDay }'][data-month='${ arrivalMonth }']`);

      currentArrivalDayDatepickerBtn.click();

      const checkoutDay = this.options.checkoutDateDropdownOptions.startDate.getDate();
      const checkoutMonth = this.options.checkoutDateDropdownOptions.startDate.getMonth();

      const currentCheckoutlDayDatepickerBtn = bookCardCheckout
        .datepicker
        .$datepicker
        .find(`.datepicker--cell.datepicker--cell-day[data-date='${ checkoutDay }'][data-month='${ checkoutMonth }']`);

      currentCheckoutlDayDatepickerBtn.click();
    }

    // Guests Dropdown

    const formGuestsDropdown = new DropdownGuests(
      this.guestsDropdownNode,
      this.options.guestsDropdownOptions
    );

    formGuestsDropdown.init();

    const inputs = this.guestsDropdownNode.find(".input-quantity");

    if (inputs.length > 0) {
      inputs.each((_, input) => {
        const inputQuantity = new InputQuantity($(input));

        inputQuantity.init();
      });
    }

    // Submit btn logic

    this.submitBtn.on("click", () => {
      const arrivalDateDropdownInputElem = this.arrivalNode.find("input");
      const checkOutDateDropdownInputElem = this.checkoutNode.find("input");

      formGuestsDropdown.open();

      const arrivalInputValue = arrivalDateDropdownInputElem.val();
      const checkOutInputValue = checkOutDateDropdownInputElem.val();

      const isInputsRequired = this.arrivalNodeInput.prop("required") && this.checkoutNodeInput.prop("required");
      const isInputsFilled = arrivalInputValue.length > 0 && checkOutInputValue.length > 0;
      const isDatesRangeCorrect = bookCardArrival.selected <= bookCardCheckout.selected;

      if (isInputsRequired && !isInputsFilled) {
        arrivalDateDropdownInputElem.get(0)
          .setCustomValidity("Выбор даты является обязательным");
      } else if (!isDatesRangeCorrect) {
        arrivalDateDropdownInputElem.get(0)
          .setCustomValidity("Дата въезда не может быть позже, чем дата выезда");
      } else {
        arrivalDateDropdownInputElem.get(0)
          .setCustomValidity("");
      }
    });
  }
}
