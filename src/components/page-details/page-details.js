import $ from "jquery";

import CardBookRoom from "@components/card-book-room/card-book-room";
import Header from "@components/header/header";
import LikeButton from "@components/btn/btn-like";

const pageHeaderElem = $(".js-page-details-header");
const likeBtnElems = $(".js-page-details-like-btn");
const cardBookRoomElem = $(".js-page-details-card-book-room");

const elems = [
  pageHeaderElem,
  likeBtnElems,
  cardBookRoomElem
];

$(window).on("load", () => {
  if (elems.every(el => el.length > 0)) {

    // Page Header

    if (pageHeaderElem.length > 0) {
      const pageHeader = new Header(pageHeaderElem);

      pageHeader.init();
    }

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
});
