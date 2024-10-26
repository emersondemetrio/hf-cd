const nativeCheckbox = document.querySelector(".native-checkbox");

nativeCheckbox.addEventListener("change", (event) => {
  console.log("Native checkbox checked state:", event.target.checked);
});

const customCheckbox = document.querySelector(".custom-checkbox");

customCheckbox.addEventListener("change", (event) => {
  console.log("Custom checkbox checked state:", event.target.checked);
});
