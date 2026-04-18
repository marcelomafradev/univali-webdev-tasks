const specialties = {
  Guilherme: ["Corte Degradê", "Barba Completa", "Pigmentação"],
  Jefe: ["Corte Clássico", "Navalhado", "Sobrancelha"],
  André: ["Corte Moderno", "Barba Desenhada", "Relaxamento"],
};

document.querySelectorAll(".barber-card").forEach((card) => {
  const name = card.querySelector(".barber-name").textContent.trim();
  const list = specialties[name];
  if (!list) return;

  const tooltip = document.createElement("div");
  tooltip.className = "barber-tooltip";
  tooltip.innerHTML = list.map((s) => `<span>${s}</span>`).join("");
  card.appendChild(tooltip);

  card.addEventListener("mouseenter", () => tooltip.classList.add("visible"));
  card.addEventListener("mouseleave", () =>
    tooltip.classList.remove("visible"),
  );
});
