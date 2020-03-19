export default class ButtonLike {
  constructor(node) {
    this.node = node;

    this.init();
  }

  init() {
    $(this.node).on("click", evt => {
      $(this.node).toggleClass("btn--active");
    });
  }
}
