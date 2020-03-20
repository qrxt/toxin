export default class Rating {
  constructor(node) {
    this.node = node;
    this.labels = this.node
      .find(".rating__item");
    this.inputs = this.node
      .find("input[type='radio']");

    this.init();
  }

  init() {
    $(this.labels).each((_, label) => {
      $(label).on("mouseover", evt => {
        console.log("entered");
      });
    });
  }
}
