document.getElementById("scheduleBtn").addEventListener("click", function () {
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
  document.getElementById("team").scrollIntoView({ behavior: "smooth" });
});
