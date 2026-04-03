const urlParams = new URLSearchParams(window.location.search);
const barberParam = urlParams.get("barber");

const barberName = barberParam ?? "Nenhum barbeiro selecionado";
document.getElementById("barberName").innerText = barberName;

const dateInput = document.getElementById("date");
dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);

let selectedTime = null;

function selectTime(btn, time) {
  document
    .querySelectorAll(".btn-time")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedTime = time;
}

function sendWhatsApp() {
  const selectedDate = dateInput.value;

  if (!barberParam) return alert("Por favor, volte e escolha um barbeiro.");
  if (!selectedDate) return alert("Por favor, escolha uma data.");
  if (!selectedTime) return alert("Por favor, selecione um horário.");

  const [year, month, day] = selectedDate.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  const message = `Olá! Gostaria de agendar um horário.\n\n *Barbeiro:* ${barberName}\n *Data:* ${formattedDate}\n *Horário:* ${selectedTime}\n\nEste horário está disponível?`;
  const whatsappNumber = "554792457984";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
}
