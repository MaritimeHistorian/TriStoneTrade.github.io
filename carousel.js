(() => {
  const AUTOPLAY_MS = 6000;
  const carousel = document.querySelector(".carousel");
  if (!carousel) {
    return;
  }

  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const prev = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer;

  if (slides.length < 2) {
    prev.hidden = true;
    next.hidden = true;
    return;
  }

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show photo ${i + 1}`);
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => {
      slide.classList.toggle("is-active", n === index);
      slide.setAttribute("aria-hidden", String(n !== index));
    });
    dots.forEach((dot, n) => {
      dot.classList.toggle("is-active", n === index);
      dot.setAttribute("aria-current", String(n === index));
    });
  }

  function stop() {
    clearInterval(timer);
  }

  function restart() {
    stop();
    if (!reducedMotion) {
      timer = setInterval(() => show(index + 1), AUTOPLAY_MS);
    }
  }

  prev.addEventListener("click", () => {
    show(index - 1);
    restart();
  });
  next.addEventListener("click", () => {
    show(index + 1);
    restart();
  });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", restart);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", restart);

  show(0);
  restart();
})();
