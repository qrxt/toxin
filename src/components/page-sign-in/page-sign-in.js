import $ from "jquery";

import BtnBurger from "../btn-burger/btn-burger";

// Burger Btn

const burgerBtnElem = $(".js-page-sign-in-header-burger-btn");

if (burgerBtnElem.length > 0) {
  const burgerBtn = new BtnBurger(burgerBtnElem);

  burgerBtn.init();
}
