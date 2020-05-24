import BtnBurger from "@components/btn-burger/btn-burger";

export default class Header {
  constructor (node) {
    this.node = node;
  }

  init () {
    // Burger Btn

    const burgerBtnElem = this.node.find(".js-header-burger-btn");

    const burgerBtn = new BtnBurger(burgerBtnElem);

    burgerBtn.init();
  }
}
