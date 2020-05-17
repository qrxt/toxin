import $ from "jquery";

import BurgerBtn from "@components/btn-burger/btn-burger";
import DropdownDate from "@components/date-dropdown/date-dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import InputQuantity from "@components/input-quantity/input-quantity";
import LikeButton from "@components/btn/btn-like";

const burgerBtnElem = $(".js-page-details-header-burger-btn");
const likeBtnElems = $(".js-page-details-like-btn");
const formArrivalDateDropdownElem = $(".js-page-details-book-arrival");
const formCheckoutDateDropdownElem = $(".js-page-details-book-check-out");
const formGuestsDropdownElem = $(".js-page-details-book-guests");

const elems = [
  burgerBtnElem,
  likeBtnElems,
  formArrivalDateDropdownElem,
  formCheckoutDateDropdownElem,
  formGuestsDropdownElem
];

if (elems.every(el => el.length > 0)) {
  // Burger Btn

  const burgerBtn = new BurgerBtn(burgerBtnElem);

  burgerBtn.init();

  // Like Btns

  likeBtnElems.each((_, likeBtnElem) => {
    const likeBtn = new LikeButton(likeBtnElem);

    likeBtn.init();
  });

  // Date Dropdowns

  const bookCardArrival = new DropdownDate(formArrivalDateDropdownElem, {
    startDate: new Date("August 19, 2019")
  });
  const bookCardCheckOut = new DropdownDate(formCheckoutDateDropdownElem, {
    startDate: new Date("August 23, 2019")
  });

  bookCardArrival.init();
  bookCardCheckOut.init();

  // Guests Dropdown

  const formGuestsDropdown = new DropdownGuests(formGuestsDropdownElem, {});

  formGuestsDropdown.init();

  const inputs = formGuestsDropdownElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}
