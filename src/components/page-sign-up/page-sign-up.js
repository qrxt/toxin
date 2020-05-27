import $ from "jquery";

import Header from "@components/header/header";

const pageHeaderElem = $(".js-page-sign-up-header");

// Page Header

if (pageHeaderElem.length > 0) {
  const pageHeader = new Header(pageHeaderElem);

  pageHeader.init();
}
