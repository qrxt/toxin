import $ from "jquery";

import Calendar from "@components/calendar/calendar";
// import Carousel  from "@components/carousel/carousel";
import CardHotelRoom from "@components/card-hotel-room/card-hotel-room";
import DateDropdown from "@components/date-dropdown/date-dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import InputQuantity from "@components/input-quantity/input-quantity";
// import Rating from "@components/rating/rating";
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
  const calendar = new Calendar({
    node: calendarInputElem,
    output: null
  }, {
    range: true,
    inline: true,
    startDates: [
      new Date("August 19, 2019"),
      new Date("August 23, 2019")
    ]
  });

  calendar.init();
}

// Первая карточка номера отеля

const cardHotelRoomFirstElem = $(".js-uikit-room-first");

if (cardHotelRoomFirstElem.length > 0) {
  const cardHotelRoom = new CardHotelRoom(cardHotelRoomFirstElem, {});

  cardHotelRoom.init();
}

// Вторая карточка номера отеля

const cardHotelRoomSecondElem = $(".js-uikit-room-second");

if (cardHotelRoomSecondElem.length > 0) {
  const cardHotelRoom = new CardHotelRoom(cardHotelRoomSecondElem, {
    carousel: {
      nav: false
    }
  });

  cardHotelRoom.init();
}
