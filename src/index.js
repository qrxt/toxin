const importAll = r =>
  r.keys().map(r);

import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";

import "./style";

// javascripts
const js = importAll(
  require.context('./components/', true, /\.js$/)
);

// pug pages
const pugs = importAll(
  require.context('raw-loader!./', false, /\.pug$/)
);

// svg assets
const svgs = importAll(
  require.context('./assets/img/', false, /\.svg$/)
);

// images
const images = importAll(
  require.context('./assets/img/', false, /\.(png|jpe?g|svg)$/)
);
