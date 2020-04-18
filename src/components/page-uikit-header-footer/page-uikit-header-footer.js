import $ from "jquery";

import BtnBurger from "@components/btn-burger/btn-burger";

const btnBurgerElem = $(".js-uikit-header-widgets");

if (btnBurgerElem.length > 0) {
  const btnBurger = new BtnBurger(btnBurgerElem);

  btnBurger.init();
}
