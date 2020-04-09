import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";

// Datepicker
import "air-datepicker";
import "air-datepicker/dist/css/datepicker.min.css";
import "air-datepicker/dist/js/datepicker";

// Carousel
import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./style";

const importAll = req =>
  req
    .keys()
    .map(module => req(module));

// Javascripts
importAll(
  require.context("./components/", true, /\.js$/u)
);

// Pug pages
importAll(
  require.context("raw-loader!./", false, /\.pug$/u)
);

// Svg assets
importAll(
  require.context("./assets/img/", false, /\.svg$/u)
);

// Images
importAll(
  require.context("./assets/img/", false, /\.(?:png|jpe?g|svg)$/u)
);
