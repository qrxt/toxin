import $ from "jquery";

import CardSignUp from "@components/card-sign-up/card-sign-up";
import Header from "@components/header/header";

const cardSignUpElem = $(".js-page-sign-in-sign-up");
const pageHeaderElem = $(".js-page-sign-in-header");

// Page Header

if (pageHeaderElem.length > 0) {
  const pageHeader = new Header(pageHeaderElem);

  pageHeader.init();
}

// Card Sign Up

if (cardSignUpElem.length > 0) {
  const cardSignUp = new CardSignUp(cardSignUpElem);

  cardSignUp.init();
}
