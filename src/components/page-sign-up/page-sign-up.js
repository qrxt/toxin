import $ from "jquery";

import CardSignUp from "../card-sign-up/card-sign-up";
import Header from "@components/header/header";

$(document).ready(() => {
  const cardSignUpElems = $(".js-page-sign-up-sign-up");
  const pageHeaderElem = $(".js-page-sign-up-header");

  const formElements = [
    pageHeaderElem,
    cardSignUpElems
  ];

  if (formElements.every(el => el.length > 0)) {
    // Page Header

    if (pageHeaderElem.length > 0) {
      const pageHeader = new Header(pageHeaderElem);

      pageHeader.init();
    }

    // Card Sign Up

    cardSignUpElems.each((_, cardSignUpElem) => {
      const cardSignUp = new CardSignUp($(cardSignUpElem));

      cardSignUp.init();
    });
  }
});
