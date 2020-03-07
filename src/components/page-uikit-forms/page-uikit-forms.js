import $ from "jquery";

import "air-datepicker/dist/css/datepicker.min.css";
import "air-datepicker/dist/js/datepicker";

import "jquery.maskedinput/src/jquery.maskedinput";

$(".js-uikit-forms-guests").accordion({
  header: "p",
  collapsible: true,
  active: false
});

const datepicker = $(".js-uikit-forms-date input");

datepicker //.datepicker({})
  .on("focus", () => {
    datepicker.mask("99.99.9999");
  });
