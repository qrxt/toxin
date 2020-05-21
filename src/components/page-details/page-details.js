import $ from "jquery";

import BurgerBtn from "@components/btn-burger/btn-burger";
import CardBookRoom from "@components/card-book-room/card-book-room";
import LikeButton from "@components/btn/btn-like";

const burgerBtnElem = $(".js-page-details-header-burger-btn");
const likeBtnElems = $(".js-page-details-like-btn");
const cardBookRoomElem = $(".js-page-details-card-book-room");

const elems = [
  burgerBtnElem,
  likeBtnElems
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

  // Card Book Room

  const cardBookRoom = new CardBookRoom(cardBookRoomElem, {
    arrivalDateDropdownOptions: {
      startDate: new Date("August 19, 2019")
    },

    checkoutDateDropdownOptions: {
      startDate: new Date("August 23, 2019")
    }
  });

  cardBookRoom.init();
}
