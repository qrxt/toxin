import $ from "jquery";

import DateDropdown from "@components/date-dropdown/date-dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import InputQuantity from "@components/input-quantity/input-quantity";

const hotelCardArrivalElem = $(".js-uikit-cards-arrival");
const hotelCardCheckOutElem = $(".js-uikit-cards-check-out");

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
