(() => {
  const DESKTOP_BREAKPOINT = 641;
  const RESIZE_DEBOUNCE_MS = 100;
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  if (!toggle || !menu) {
    return;
  }

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches) {
        closeMenu();
      }
    }, RESIZE_DEBOUNCE_MS);
  });
})();
