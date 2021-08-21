import createCustomAnimation from "./createCustomAnimation";

export const Reset = createCustomAnimation(({ elements }) => {
  setTimeout(() => {
    elements.forEach((element) => {
      element.classList.add("reanim__reset");
      void element.offsetWidth;
      element.classList.remove("reanim__reset");
    });
  });
});
