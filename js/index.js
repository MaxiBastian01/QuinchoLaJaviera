
// Carrusel
const track = document.getElementById("track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

if (track && prevBtn && nextBtn && dotsWrap) {
  const slides = Array.from(track.children);
  let index = 0;

  // Crear puntos
  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(d);
  });

  const dots = Array.from(dotsWrap.children);

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  });


   // Swipe robusto (Pointer Events) - funciona en la mayoría de celulares
  const viewport = track.closest(".viewport") || track;

  let xStart = null;
  let yStart = null;

  viewport.style.touchAction = "pan-y"; // deja scroll vertical, permite gesto horizontal

  viewport.addEventListener("pointerdown", (e) => {
    // Solo dedo o mouse principal
    if (e.pointerType === "mouse" && e.button !== 0) return;

    xStart = e.clientX;
    yStart = e.clientY;

    // Captura el puntero para que no se “pierda” si el dedo se mueve
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener("pointerup", (e) => {
    if (xStart === null || yStart === null) return;

    const dx = e.clientX - xStart;
    const dy = e.clientY - yStart;

    // Si fue más vertical, era scroll
    if (Math.abs(dy) > Math.abs(dx)) {
      xStart = yStart = null;
      return;
    }

    const TH = 30; // más sensible que 50

    if (dx > TH) goTo(index - 1);
    else if (dx < -TH) goTo(index + 1);

    xStart = yStart = null;
  });

  viewport.addEventListener("pointercancel", () => {
    xStart = yStart = null;
  });

}


