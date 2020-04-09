export default class Carousel {
  constructor (node, options) {
    this.node = node;
    this.options = {
      loop: false,
      nav: false,
      dots: true,
      items: 1,

      ...options
    };
  }

  init () {
    console.log(this.options);

    this.node
      .owlCarousel(this.options);
  }
}
