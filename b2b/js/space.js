const images = Array.from(document.querySelectorAll(".space-gallery img"));
let current = 0;

const overlay = document.createElement("div");
overlay.className = "lightbox";
overlay.innerHTML = `
  <button class="lb-close">&times;</button>
  <button class="lb-prev">&#8249;</button>
  <img class="lb-img" src="" alt="" />
  <button class="lb-next">&#8250;</button>
`;
document.body.appendChild(overlay);

const lbImg = overlay.querySelector(".lb-img");

function open(index) {
  current = index;
  lbImg.src = images[current].src;
  lbImg.alt = images[current].alt;
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function close() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function prev() {
  open((current - 1 + images.length) % images.length);
}
function next() {
  open((current + 1) % images.length);
}

images.forEach((img, i) => img.addEventListener("click", () => open(i)));
overlay.querySelector(".lb-close").addEventListener("click", close);
overlay.querySelector(".lb-prev").addEventListener("click", prev);
overlay.querySelector(".lb-next").addEventListener("click", next);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) close();
});

document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("active")) return;
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
  if (e.key === "Escape") close();
});
