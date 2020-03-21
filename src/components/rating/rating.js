import $ from "jquery";

export default class Rating {
  constructor (node) {
    this.node = node;
    this.labels = this.node
      .find(".rating__item");
    this.inputs = this.node
      .find("input");
    this._activeClassname = "rating__item--active";
  }

  init () {
    this._resetHighlightToIndex(0, 5);
    this._highlightToIndex(this._findCheckedIndex());

    $(this.labels).each((idx, label) => {
      $(label).hover(() => {
        this._resetHighlightToIndex(0, 5);
        this._highlightToIndex(idx);
      });

      $(label).mouseout(() => {
        const active = this._findCheckedIndex();

        this._resetHighlightToIndex(0, 5);
        this._highlightToIndex(active);
      });

      $(label).click(() => {
        this._resetHighlightToIndex(0, 5);
        this._highlightToIndex(idx);
      });
    });
  }

  _highlightToIndex (idx) {
    if (idx >= 0) {
      $(this.labels)
        .slice(0, idx + 1)
        .each((_, label) => {
          $(label).addClass(this._activeClassname);
        });
    }
  }

  _resetHighlightToIndex (from, to) {
    $(this.labels)
      .slice(from, to)
      .each((_, label) => {
        $(label)
          .removeClass(this._activeClassname);
      });
  }

  _findCheckedIndex () {
    return this.inputs
      .get()
      .findIndex(input =>
        $(input).is(":checked"));
  }
}
