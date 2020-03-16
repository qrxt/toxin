import $ from "jquery";

import Dropdown from "../dropdown/dropdown";

export default class ExpandableList extends Dropdown {
  constructor(node, options) {
    const dropdownOptions = {
      header: ".js-expandable-list-title",

      ...options
    }

    console.log(dropdownOptions)

    super(node, dropdownOptions);

    this.init();
  }
};
