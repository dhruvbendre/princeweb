/* Small visual utilities kept separate from core behavior */
document.addEventListener("DOMContentLoaded", () => {
  const activePath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === activePath) link.classList.add("active");
  });

  document.querySelectorAll(".mini-chart").forEach((chart) => {
    if (chart.children.length) return;
    [52, 34, 66, 42, 72, 48, 60, 38, 70].forEach((height, index) => {
      const candle = document.createElement("span");
      candle.className = "candle";
      candle.style.height = `${height}px`;
      candle.style.animationDelay = `${index * -0.18}s`;
      chart.appendChild(candle);
    });
  });
});
