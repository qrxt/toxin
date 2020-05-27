import $ from "jquery";

import BtnBurger from "@components/btn-burger/btn-burger";
import Popup from "../popup/popup";

export default class Header {
  constructor (node) {
    this.node = node;
  }

  init () {
    // Burger Btn

    const burgerBtnElem = this.node.find(".js-header-burger-btn");

    const burgerBtn = new BtnBurger(burgerBtnElem);

    burgerBtn.init();

    // Sign In Popup

    const signInBtnElem = this.node.find(".js-header-sign-in-btn");

    const signInPopupElem = $(".js-landing-page-popup-sign-in");

    const signInPopup = new Popup(signInPopupElem, signInBtnElem, {});

    signInPopup.init();

    if (signInBtnElem.length > 0) {
      signInBtnElem.on("click", evt => {
        evt.preventDefault();
      });
    }

    // Sign Up Popup

    const signUpBtnElem = this.node.find(".js-header-sign-up-btn");

    const signUpPopupElem = $(".js-landing-page-popup-sign-up");

    const signUpPopup = new Popup(signUpPopupElem, signUpBtnElem, {});

    signUpPopup.init();

    if (signUpBtnElem.length > 0) {
      signUpBtnElem.on("click", evt => {
        evt.preventDefault();
      });
    }
  }
}
