import { Back, Expo, gsap, Power0 } from "gsap";
var circle = document.querySelector(".ball");

gsap.set(circle, {
  xPercent: -50,
  yPercent: -50,
});

window.addEventListener("mousemove", moveCircle);

function moveCircle(e) {
  gsap.to(circle, 0.3, {
    x: e.clientX,
    y: e.clientY,
  });
}
