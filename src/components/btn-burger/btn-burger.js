import $ from "jquery";

export default class BtnBurger {
  constructor (node) {
    this.node = node;
  }

  init () {
    $(this.node).on("click", () => {
      $(this.node).toggleClass("btn-burger--active");
    });
  }
}
