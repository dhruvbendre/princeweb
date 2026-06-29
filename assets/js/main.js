/* Global interface behavior */
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".page-loader");
  const progress = document.querySelector(".scroll-progress");
  const navbar = document.querySelector(".navbar");
  const backToTop = document.querySelector(".back-to-top");
  const themeToggle = document.querySelector(".theme-toggle");
  const counters = document.querySelectorAll("[data-count]");
  const tiltCards = document.querySelectorAll("[data-tilt]");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = new Date().getFullYear();

  window.addEventListener("load", () => {
    if (loader) loader.classList.add("loaded");
  });

  const setScrolled = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (navbar) navbar.classList.toggle("scrolled", scrollTop > 24);
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 500);
    if (progress && docHeight > 0) progress.style.width = `${(scrollTop / docHeight) * 100}%`;
  };
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const savedTheme = localStorage.getItem("apex-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  if (themeToggle) {
    themeToggle.innerHTML = document.body.classList.contains("dark-mode") ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      localStorage.setItem("apex-theme", dark ? "dark" : "light");
      themeToggle.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    });
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      ripple.className = "ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 620);
    });
  });

  if (window.AOS) {
    AOS.init({ once: true, duration: 760, easing: "ease-out-cubic", offset: 80 });
  }

  if (window.Typed && document.querySelector(".typed-text")) {
    new Typed(".typed-text", {
      strings: ["risk-first trading", "technical analysis", "disciplined execution", "market confidence"],
      typeSpeed: 48,
      backSpeed: 24,
      backDelay: 1400,
      loop: true
    });
  }

  if (window.CountUp && counters.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        const value = Number(target.dataset.count);
        const suffix = target.dataset.suffix || "";
        const count = new countUp.CountUp(target, value, { duration: 2.2, suffix });
        if (!count.error) count.start();
        obs.unobserve(target);
      });
    }, { threshold: 0.35 });
    counters.forEach((counter) => observer.observe(counter));
  }

  if (window.Swiper && document.querySelector(".testimonial-swiper")) {
    new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 22,
      loop: true,
      autoplay: { delay: 3600, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
    });
  }

  if (window.particlesJS && document.querySelector("#particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 34, density: { enable: true, value_area: 900 } },
        color: { value: "#2563eb" },
        shape: { type: "circle" },
        opacity: { value: 0.22 },
        size: { value: 2.8 },
        line_linked: { enable: true, distance: 145, color: "#2563eb", opacity: 0.13, width: 1 },
        move: { enable: true, speed: 1.2 }
      },
      interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
      retina_detect: true
    });
  }

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  const glow = document.querySelector(".mouse-glow");
  if (glow) {
    window.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const forms = document.querySelectorAll("[data-static-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const alert = form.querySelector(".form-alert");
      if (alert) {
        alert.textContent = "Thank you. Our advisory team will contact you shortly.";
        alert.classList.remove("d-none");
      }
      form.reset();
    });
  });
});
