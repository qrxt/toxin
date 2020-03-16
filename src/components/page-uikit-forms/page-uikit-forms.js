import TextFieldMasked from "@components/text-field/text-field-masked";
import Dropdown from "@components/dropdown/dropdown";
import DropdownRooms from "@components/dropdown-rooms/dropdown-rooms";
import DateDropdown from "@components/date-dropdown/date-dropdown";
import InputQuantity from "@components/input-quantity/input-quantity";
import ExpandableList from "@components/expandable-list/expandable-list";

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

const inputQuantityBathroomsElem = $(".js-uikit-forms-bathrooms-quantity");
const inputQuantityBedsElem = $(".js-uikit-forms-beds-quantity");
if (inputQuantityBathroomsElem.length && inputQuantityBedsElem) {
  const inputQuantityBaths = new InputQuantity(inputQuantityBathroomsElem);
  const inputQuantityBeds = new InputQuantity(inputQuantityBedsElem);
}

const roomsDropdownElem = $(".js-uikit-forms-dropdown-rooms");
if (roomsDropdownElem.length) {
  const dropdownOptions = {
    active: false
  };

  const roomsDropdown = new DropdownRooms(roomsDropdownElem, dropdownOptions);

  const inputs = roomsDropdownElem.find(".input-quantity");
  if (inputs.length) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));
    });
  }
};

const roomsDropdownExpandedElem = $(".js-uikit-forms-dropdown-rooms-expanded");
if (roomsDropdownExpandedElem.length) {
  const roomsDropdownExpanded = new DropdownRooms(roomsDropdownExpandedElem, {});

  const inputs = roomsDropdownExpandedElem.find(".input-quantity");
  if (inputs.length) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));
    });
  }
}

const expandableCheckboxListElem = $(".js-uikit-forms-expandable-closed");
if (expandableCheckboxListElem.length) {
  const expandableList = new ExpandableList(expandableCheckboxListElem, {});
}

const expandableCheckboxListOpenedElem = $(".js-uikit-forms-expandable-opened");
if (expandableCheckboxListOpenedElem.length) {
  const expandableList = new ExpandableList(expandableCheckboxListOpenedElem, {
    active: 0
  });
}
