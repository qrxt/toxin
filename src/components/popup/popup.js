import $ from "jquery";

const disableScroll = () => {
  window.scrollTo(0, 0);
};

const KEY_ESCAPE = "Escape";

export default class Popup {
  constructor (node, invokeBtn, options) {
    this.node = node;
    this.popup = this.node.find(".popup__popup");
    this.invokeBtnElems = invokeBtn;

    this.options = {
      overlayShowClassname: "popup--show",
      popupShowClassname: "popup__popup--show",

      ...options
    };
  }

  open () {
    const firstInput = this.node.find("input").first();

    this.node.addClass(this.options.overlayShowClassname);
    this.popup.addClass(this.options.popupShowClassname);

    if (firstInput) {
      firstInput.focus();
    }

    document.body.style.height = "100vh";
    document.addEventListener("scroll", disableScroll);
  }

  close () {
    this.node.removeClass(this.options.overlayShowClassname);
    this.popup.removeClass(this.options.popupShowClassname);

    document.body.style.height = "auto";
    document.removeEventListener("scroll", disableScroll);
  }

  init () {
    if (this.invokeBtnElems.length > 0) {
      this.invokeBtnElems.each((_, btn) => {
        $(btn).on("click", evt => {
          evt.preventDefault();

          this.open();
        });
      });
    }

    const onEscapeKeydown = evt => {
      if (evt.key === KEY_ESCAPE) {
        this.close();
      }
    };

    $(document).on("keydown", onEscapeKeydown);

    this.node.on("click", () => {
      this.close();
    });

    this.popup.on("click", evt => {
      evt.stopPropagation();
    });
  }
}
