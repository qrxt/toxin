import $ from "jquery";

import DateDropdown from "@components/date-dropdown/date-dropdown";
import Dropdown from "@components/dropdown/dropdown";
import DropdownGuests from "@components/dropdown-guests/dropdown-guests";
import DropdownRooms from "@components/dropdown-rooms/dropdown-rooms";
import ExpandableList from "@components/expandable-list/expandable-list";
import InputQuantity from "@components/input-quantity/input-quantity";
import LikeButton from "@components/btn/btn-like";
import Range from "@components/range/range";
import Rating from "@components/rating/rating";
import TextFieldMasked from "@components/text-field/text-field-masked";

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

  const maskedDateTextField = new TextFieldMasked(node, {
    maskOptions, datepickerOptions: {}
  });

  maskedDateTextField.init();
}

const dropdownExampleElem = $(".js-uikit-forms-dropdown-example");

if (dropdownExampleElem.length > 0) {
  const dropdownOptions = {
    header: "p",
    collapsible: true
  };

  const dropdownExample = new Dropdown(dropdownExampleElem, dropdownOptions);

  dropdownExample.init();
}

const dateDropdownElemFirst = $(".js-uikit-forms-date-dropdown-first");
const dateDropdownElemSecond = $(".js-uikit-forms-date-dropdown-second");

if (dateDropdownElemFirst.length > 0 && dateDropdownElemSecond.length > 0) {
  const dropdownExampleFirst = new DateDropdown(dateDropdownElemFirst, {});
  const dropdownExampleSecond = new DateDropdown(dateDropdownElemSecond, {
    startDate: new Date("August 19, 2019")
  });

  dropdownExampleFirst.init();
  dropdownExampleSecond.init();
}

const dateDropdownRangeElem = $(".js-uikit-forms-date-dropdown-range");

if (dateDropdownRangeElem.length > 0) {
  const dropdownRange = new DateDropdown(dateDropdownRangeElem, {
    range: true,
    multipleDatesSeparator: " - ",
    dateFormat: "dd M",
    startDateRange: "19 авг - 23 авг"
  });

  dropdownRange.init();
}

const inputQuantityBathroomsElem = $(".js-uikit-forms-bathrooms-quantity");
const inputQuantityBedsElem = $(".js-uikit-forms-beds-quantity");

if (inputQuantityBathroomsElem.length > 0 && inputQuantityBedsElem > 0) {
  const inputQuantityBaths = new InputQuantity(inputQuantityBathroomsElem);
  const inputQuantityBeds = new InputQuantity(inputQuantityBedsElem);

  inputQuantityBaths.init();
  inputQuantityBeds.init();
}

const roomsDropdownElem = $(".js-uikit-forms-dropdown-rooms");

if (roomsDropdownElem.length > 0) {
  const dropdownOptions = {
    collapsible: true
  };

  const roomsDropdown = new DropdownRooms(roomsDropdownElem, dropdownOptions);

  roomsDropdown.init();

  const inputs = roomsDropdownElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}

const roomsDropdownExpandedElem = $(".js-uikit-forms-dropdown-rooms-expanded");

if (roomsDropdownExpandedElem.length > 0) {
  const roomsDropdownExpanded = new DropdownRooms(roomsDropdownExpandedElem, {
    active: 0
  });

  roomsDropdownExpanded.init();

  const inputs = roomsDropdownExpandedElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}

const expandableCheckboxListElem = $(".js-uikit-forms-expandable-closed");

if (expandableCheckboxListElem.length > 0) {
  const expandableList = new ExpandableList(expandableCheckboxListElem, {});

  expandableList.init();
}

const expandableCheckboxListOpenedElem = $(".js-uikit-forms-expandable-opened");

if (expandableCheckboxListOpenedElem.length > 0) {
  const expandableList = new ExpandableList(expandableCheckboxListOpenedElem, {
    active: 0
  });

  expandableList.init();
}

const likeBtnElems = $(".js-like-btn");

if (likeBtnElems.length > 0) {
  likeBtnElems.each((_, likeBtnElem) => {
    const likeBtn = new LikeButton(likeBtnElem);

    likeBtn.init();
  });
}

const starRatingElem = $(".js-uikit-forms-rating");
const starRatingFullElem = $(".js-uikit-forms-rating-full");

if (starRatingElem.length > 0 && starRatingFullElem.length > 0) {
  const starRating = new Rating(starRatingElem);
  const starRatingAgain = new Rating(starRatingFullElem);

  starRating.init();
  starRatingAgain.init();
}

const dropdownGuestsElem = $(".js-uikit-forms-dropdown-guests");

if (dropdownGuestsElem.length > 0) {
  const dropdownGuests = new DropdownGuests(dropdownGuestsElem, {
    active: 0
  });

  dropdownGuests.init();

  const inputs = dropdownGuestsElem.find(".input-quantity");

  if (inputs.length > 0) {
    inputs.each((_, input) => {
      const inputQuantity = new InputQuantity($(input));

      inputQuantity.init();
    });
  }
}

const rangeElem = $(".js-uikit-forms-range");

if (rangeElem.length > 0) {
  const range = new Range(rangeElem, {
    min: 0,
    max: 15500,
    values: [ 5000, 10000 ],
    unit: "₽"
  });

  range.init();
}
