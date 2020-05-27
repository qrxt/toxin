import $ from "jquery";

// const disableScroll = () => {
//   window.scrollTo(0, 0);
// };

const KEY_ESCAPE = "Escape";

export default class Popup {
  constructor (node, invokeBtn, options) {
    this.node = node;
    this.popup = this.node.find(".popup__popup");
    this.invokeBtnElems = invokeBtn;

    this.options = {
      popupShowClassname: "popup--show",

      ...options
    };
  }

  close () {
    this.node.removeClass(this.options.popupShowClassname);

    // document.body.style.position = "static";
    // document.body.style.height = "auto";
    // document.body.style.overflow = "visible";
    // document.removeEventListener("scroll", disableScroll);
  }

  open () {
    const firstInput = this.node.find("input");

    this.node.addClass(this.options.popupShowClassname);

    if (firstInput) {
      firstInput.focus();
    }

    // document.body.style.position = "fixed";
    // document.body.style.height = "100vh";
    // document.body.style.overflow = "hidden";
    // document.addEventListener("scroll", disableScroll);
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
