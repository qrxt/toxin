import $ from "jquery";

import BurgerBtn from "../btn-burger/btn-burger";
import LikeButton from "../btn/btn-like";

const burgerBtnElem = $(".js-page-details-header-burger-btn");
const likeBtnElems = $(".js-page-details-like-btn");

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
}
