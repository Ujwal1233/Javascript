const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "clear") {
      display.value = "";
      return;
    }

    if (action === "equals") {
      if (display.value.trim() === "") {
        return;
      }

      try {
        // Evaluate only controlled button input from this UI.
        display.value = String(Function('"use strict"; return (' + display.value + ')')());
      } catch {
        display.value = "Error";
      }
      return;
    }

    if (display.value === "Error") {
      display.value = "";
    }

    display.value += value;
  });
});