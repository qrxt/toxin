export default class ButtonLike {
  constructor(node) {
    this.node = node;
    this.valueElem = $(this.node).find("span");

    this.init();
  }

  init() {
    $(this.node).on("click", evt => {
      const currentValue = Number(this.valueElem.text());

      if ($(this.node).hasClass("btn--active")) {
        $(this.valueElem).text(currentValue - 1);

        $(this.node).toggleClass("btn--active");
      } else {
        $(this.valueElem).text(currentValue + 1);

        $(this.node).toggleClass("btn--active");
      }
    });
  }
}
