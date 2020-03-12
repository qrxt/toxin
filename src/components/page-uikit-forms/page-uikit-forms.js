import TextFieldMasked from "@components/text-field/text-field-masked";
import Dropdown from "@components/dropdown/dropdown";
import DateDropdown from "@components/date-dropdown/date-dropdown";
import InputQuantity from "@components/input-quantity/input-quantity";

const maskedDateTextFieldElem = $(".js-uikit-forms-masked-date");
if (maskedDateTextFieldElem.length) {
  const node = maskedDateTextFieldElem.get(0);
  node.addEventListener("keydown", evt => {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
  });

  const maskOptions = {
    mask: Date
  };

  const datepickerOptions = {};

  const maskedDateTextField = new TextFieldMasked(node, {
    maskOptions, datepickerOptions
  });
}

const dropdownExampleElem = $(".js-uikit-forms-dropdown-example");
if (dropdownExampleElem.length) {
  const dropdownOptions = {
    header: "p",
    collapsible: true,
    active: false
  };

  const dropdownExample = new Dropdown(dropdownExampleElem, dropdownOptions);
}

const dateDropdownElemFirst = $(".js-uikit-forms-date-dropdown-first");
const dateDropdownElemSecond = $(".js-uikit-forms-date-dropdown-second");

if (dateDropdownElemFirst.length && dateDropdownElemSecond.length) {
  const dropdownExampleFirst = new DateDropdown(dateDropdownElemFirst, {});
  const dropdownExampleSecond = new DateDropdown(dateDropdownElemSecond, {
    startDate: new Date("August 19, 2019")
  });
}

const dateDropdownRangeElem = $(".js-uikit-forms-date-dropdown-range");
if (dateDropdownRangeElem.length) {
  const dropdownRange = new DateDropdown(dateDropdownRangeElem, {
    range: true,
    multipleDatesSeparator: " - ",
    dateFormat: "dd M",
    startDateRange: "19 авг - 23 авг"
  });
}

const exampleInputQuantityElem = $(".js-uikit-forms-input-quantity");
if (exampleInputQuantityElem.length) {
  const inputQuantity = new InputQuantity(exampleInputQuantityElem);
}
