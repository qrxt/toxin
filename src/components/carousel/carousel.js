const arrowSvgHtml = `
  <svg width="20" height="20" aria-hidden="true">
    <use xlink:href="assets/img/sprite.svg#expand-more"></use>
  </svg>
`;

export default class Carousel {
  constructor (node, options) {
    this.node = node;
    this.carouselPreview = this.node.prev();
    this.options = {
      loop: false,
      nav: true,
      dots: true,
      items: 1,
      autoWidth: true,
      lazyLoad: true,
      lazyLoadEager: 1,
      navText: [ arrowSvgHtml, arrowSvgHtml ],
      responsive: {
        0: {
          lazyLoad: true,
          autoWidth: false
        },

        1024: {
          lazyLoad: true,
          autoWidth: true
        }
      },

      ...options
    };
  }

  init () {
    this.node
      .owlCarousel(this.options);

    this.carouselPreview.hide();
  }
}
