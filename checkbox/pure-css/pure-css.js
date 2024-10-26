const customCheckboxes = document.querySelectorAll(".custom-checkbox");
const keyEvents = ["Space", "Enter"];

customCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("keydown", (event) => {
    if (!keyEvents.includes(event.code)) return;
    event.preventDefault();

    const input = document.getElementById(checkbox.getAttribute("for"));
    input.checked = !input.checked;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
});

// Bindings
const checkboxes = document.querySelectorAll("input[type=checkbox]");

checkboxes.forEach((checkbox) => { // All checkboxes
  checkbox.addEventListener("change", (event) => { // A single one
    checkboxes.forEach((cb) => { // Propagate to all.
      cb.checked = event.target.checked;
    });
  });
});
