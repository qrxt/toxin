import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";

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
