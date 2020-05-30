import $ from "jquery";

import CardHotelRoom from "../card-hotel-room/card-hotel-room";
import CardSignUp from "../card-sign-up/card-sign-up";
import DateDropdown from "../date-dropdown/date-dropdown";
import ExpandableList from "../expandable-list/expandable-list";
import GuestsDropdown from "../dropdown-guests/dropdown-guests";
import Header from "@components/header/header";
import InputQuantity from "../input-quantity/input-quantity";
import Range from "../range/range";
import RoomsDropdown from "../dropdown-rooms/dropdown-rooms";

const cardSignUpElem = $(".js-page-catalog-sign-up");
const pageHeaderElem = $(".js-page-catalog-header");
const datesRangeDropdownElem = $(".js-page-catalog-dates-range");
const guestsDropdownElem = $(".js-page-catalog-guests");
const priceRangeElem = $(".js-page-catalog-price-range");
const roomsDropdownElem = $(".js-catalog-dropdown-rooms");
const expandableListElem = $(".js-page-catalog-expandable");
const cardHotelRoomElems = $(".js-page-catalog-card-hotel-room");

const formElems = [
  pageHeaderElem,
  datesRangeDropdownElem,
  guestsDropdownElem,
  priceRangeElem,
  roomsDropdownElem,
  expandableListElem,
  cardHotelRoomElems
];

if (formElems.every(formElem => formElem.length > 0)) {
  // Page Header

  if (pageHeaderElem.length > 0) {
    const pageHeader = new Header(pageHeaderElem);

    pageHeader.init();
  }

  // Card Sign Up

  const cardSignUp = new CardSignUp(cardSignUpElem);

  cardSignUp.init();

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

  const guestInputs = guestsDropdownElem.find(".input-quantity");

  if (guestInputs.length > 0) {
    guestInputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }

  // Price Range

  const priceRange = new Range(priceRangeElem, {
    min: 0,
    max: 15500,
    values: [ 5000, 10000 ],
    unit: "₽"
  });

  priceRange.init();

  // Rooms Dropdown

  const roomsDropdown = new RoomsDropdown(roomsDropdownElem, {});

  roomsDropdown.init();

  const roomInputs = roomsDropdownElem.find(".input-quantity");

  if (roomInputs.length > 0) {
    roomInputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }

  // Additional Options Expandable List

  const expandableList = new ExpandableList(expandableListElem, {});

  expandableList.init();

  // Catalog Hotel Room Cards

  $.map(cardHotelRoomElems, cardElem => {
    const cardHotelRoom = new CardHotelRoom($(cardElem), {});

    cardHotelRoom.init();

    return cardHotelRoom;
  });
}

