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

    this.options = {
      guestsDropdownOptions: {},

      ...options
    };
  }

  init () {
    // Date Dropdowns
    const bookCardArrival = new DropdownDate(this.arrivalNode, {
      startDate: this.options.startDate
    });

    const bookCardCheckOut = new DropdownDate(this.checkoutNode, {
      startDate: this.options.startDate
    });

    bookCardArrival.init();
    bookCardCheckOut.init();

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
  }
}

// // Submit btn logic

// hotelRoomSearchSubmitBtn.on("click", () => {
//   const arrivalDateDropdownInputElem = $(arrivalDateDropdownElem).find("input");
//   const checkOutDateDropdownInputElem = $(checkOutDateDropdownElem).find("input");

//   guestsDropdown.open();

//   const arrivalInputValue = arrivalDateDropdownInputElem.val();
//   const checkOutInputValue = checkOutDateDropdownInputElem.val();

//   const isInputsFilled = arrivalInputValue.length > 0 && checkOutInputValue.length > 0;
//   const isDatesRangeCorrect = arrivalDateDropdown.selected <= checkOutDateDropdown.selected;

//   if (isInputsFilled && isDatesRangeCorrect) {
//     arrivalDateDropdownInputElem.get(0).setCustomValidity("");
//   } else {
//     arrivalDateDropdownInputElem.get(0).setCustomValidity("Дата въезда не может быть позже, чем дата выезда");
//   }
// });
