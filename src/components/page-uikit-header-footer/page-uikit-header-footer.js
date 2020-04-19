import $ from "jquery";

import BtnBurger from "@components/btn-burger/btn-burger";

// Header with widgets burger btn
const btnBurgerForHeaderWidgetsElem = $(".js-uikit-header-widgets");

if (btnBurgerForHeaderWidgetsElem.length > 0) {
  const btnBurger = new BtnBurger(btnBurgerForHeaderWidgetsElem);

  btnBurger.init();
}

// Header minimal burger btn
const btnBurgerForHeaderMinimalElem = $(".js-uikit-header-minimal");

if (btnBurgerForHeaderMinimalElem.length > 0) {
  const btnBurger = new BtnBurger(btnBurgerForHeaderMinimalElem);

  btnBurger.init();
}
