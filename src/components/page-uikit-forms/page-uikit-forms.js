import TextFieldMasked from "@components/text-field/text-field-masked";
import Dropdown from "@components/dropdown/dropdown";
import DateDropdown from "@components/date-dropdown/date-dropdown";

const maskedDateTextFieldElem = $(".js-uikit-forms-masked-date");
if (maskedDateTextFieldElem.length > 0) {
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
if (dropdownExampleElem.length > 0) {
  const dropdownOptions = {
    header: "p",
    collapsible: true,
    active: false
  };

  const dropdownExample = new Dropdown(dropdownExampleElem, dropdownOptions);
}

const dateDropdownElem = $(".js-uikit-forms-date-dropdown");
if (dateDropdownElem.length > 0) {
  const dropdownOptions = {
    offset: dateDropdownElem.get(0).scrollHeight
  };

  const dropdownExample = new DateDropdown(dateDropdownElem, dropdownOptions);
}
