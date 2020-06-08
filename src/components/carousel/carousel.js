import $ from "jquery";

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
      navText: [ arrowSvgHtml, arrowSvgHtml ],

      responsive: {
        0: {
          items: 1,
          autoWidth: false
        },

        768: {
          autoWidth: true
        }
      },

      ...options
    };
  }

  init () {
    const owlItems = this.node.find(".owl-item");
    const imagesQuantity = owlItems.length;

    $.when(this.node.owlCarousel(this.options).trigger("refresh.owl.carousel"))
      .then(() => {
        this.carouselPreview.hide();

        this.node.find(".owl-prev").attr("aria-label", "Предыдущее фото");
        this.node.find(".owl-next").attr("aria-label", "Следующее фото");

        this.node.find(".owl-dot").each((idx, dot) => {
          $(dot).attr("aria-label", `Переключить на ${ idx } фото`);
        });

        owlItems.each((_, item) => {
          $(item).width(this.node.width());
        });

        const sumOfImageWidths = this.node.width() * imagesQuantity;

        this.node.find("owl-stage").width(
          sumOfImageWidths
        );
      });
  }
}
