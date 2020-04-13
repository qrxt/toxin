import Carousel from "@components/carousel/carousel";
import Rating from "@components/rating/rating";

export default class CardHotelRoom {
  constructor (node, options) {
    this.node = node;
    this.options = options;
  }

  init () {
    const carouselElem = this.node.find(".js-carousel");
    const carousel = new Carousel(carouselElem, this.options.carousel);

    carousel.init();

    const ratingElem = this.node.find(".js-rating");
    const rating = new Rating(ratingElem);

    rating.init();
  }
}
