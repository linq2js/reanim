import createCustomAnimation from "./createCustomAnimation";

export const Collapse = createCustomAnimation(({ duration, elements }) => {
  elements.forEach((element) => {
    element.classList.remove("reanim__collapsible", "reanim__active");
    element.style.transitionDuration = duration + "ms";
    element.style.maxHeight = element.scrollHeight + "px";
    element.classList.add("reanim__collapsible");
  });

  setTimeout(() => {
    elements.forEach((element) => {
      element.classList.add("reanim__active");
      element.style.maxHeight = 0 + "px";
    });
  });
});

export const Expand = createCustomAnimation(({ duration, elements }) => {
  elements.forEach((element) => {
    element.classList.remove("reanim__collapsible", "reanim__active");
    element.style.transitionDuration = duration + "ms";
    element.style.maxHeight = 0 + "px";
    element.classList.add("reanim__collapsible");
  });

  setTimeout(() => {
    elements.forEach((element) => {
      element.classList.add("reanim__active");
      element.style.maxHeight = null;
    });
  });
});
