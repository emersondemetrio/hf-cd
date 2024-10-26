const KeyboardEventKeys = ["Space", "Enter"];
const CustomCSS = `<link rel="stylesheet" href="web-component.css">`;
const SvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" fill="none"></rect>
  <polyline
    points="216 72.005 104 184 48 128.005"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="16"></polyline>
</svg>`;

/**
 * Custom checkbox web component
 * @element custom-checkbox
 * @attr {boolean} checked - Sets the checkbox state
 * @attr {boolean} disabled - Disables the checkbox
 * @fires {CustomEvent} change - Fires when checkbox state changes
 * @usage <custom-checkbox [checked] [disabled]></custom-checkbox>
 */
class CustomCheckbox extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.internals = this.attachInternals();
    this.internalState = false;
  }

  connectedCallback() {
    this.setAttribute("role", "checkbox");
    this.setAttribute("tabindex", "0");

    if (this.hasAttribute("disabled")) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("tabindex", "-1");
    }

    const isChecked = this.hasAttribute("checked");
    this.internalState = isChecked;
    this.setAttribute("aria-checked", isChecked);
    if (isChecked) {
      this.internals.setFormValue("on");
    }

    this.shadowRoot.innerHTML = [CustomCSS, SvgIcon].join("");

    this.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;

      this.checked = !this.checked;
      this._propagate();
    });

    this.addEventListener("keydown", (event) => {
      if (this.hasAttribute("disabled")) return;
      if (!KeyboardEventKeys.includes(event.code)) return;

      event.preventDefault();
      this.checked = !this.checked;
      this._propagate();
    });
  }

  static get observedAttributes() {
    return ["checked", "disabled"];
  }

  attributeChangedCallback(name, prev, next) {
    if (prev === next) return;

    if (name === "checked") {
      this.internalState = next !== null;
      this.setAttribute("aria-checked", this.internalState);
      this.internals.setFormValue(this.internalState ? "on" : null);
    }

    if (name === "disabled") {
      const isDisabled = next !== null;
      this.setAttribute("aria-disabled", isDisabled);
      this.toggleAttribute("disabled", isDisabled);
      this.setAttribute("tabindex", isDisabled ? "-1" : "0");
    }
  }

  get checked() {
    return this.internalState;
  }

  set checked(value) {
    const isChecked = !!value;
    if (isChecked === this.internalState) return;

    this.internalState = isChecked;
    this.toggleAttribute("checked", isChecked);
  }

  _propagate() {
    const checked = this.checked;
    const event = new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: { checked },
    });

    this.dispatchEvent(event);
  }
}

// Register
customElements.define("custom-checkbox", CustomCheckbox);

// Bindings
const nativeCheckbox = document.querySelector("input[type=checkbox]");
const customCheckbox = document.querySelector("custom-checkbox");

const update = (target, value) => target.checked = value;

nativeCheckbox.addEventListener(
  "change",
  (event) => {
    update(customCheckbox, event.target.checked);
  },
);

customCheckbox.addEventListener(
  "change",
  (event) => {
    update(nativeCheckbox, event.detail.checked);
  },
);

const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("focus", () => {
    checkboxes.forEach((cb) => cb.classList.add("outline"));
  });

  checkbox.addEventListener("blur", () => {
    if (![...checkboxes].some((cb) => cb === document.activeElement)) {
      checkboxes.forEach((cb) => cb.classList.remove("outline"));
    }
  });
});
