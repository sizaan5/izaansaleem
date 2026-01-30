// Apple-Style Enhanced JS
// Includes: Dark Mode, Smooth Scroll, Active Nav, Parallax, Scroll Reveal, Back-to-Top Button, Fade Transitions

/* -----------------------------------
   THEME TOGGLE (Light <-> Dark)
----------------------------------- */
const toggleModeBtn = document.getElementById("toggleMode");

if (toggleModeBtn) {
  toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleModeBtn.innerHTML = document.body.classList.contains("dark")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

/* -----------------------------------
   SMOOTH SCROLLING
----------------------------------- */
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

/* -----------------------------------
   HEADER PARALLAX FADE
----------------------------------- */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  let offset = window.scrollY;
  if (offset < 300) {
    header.style.opacity = 1 - offset / 300;
    header.style.transform = `translateY(${offset * 0.15}px)`;
  }
});

/* -----------------------------------
   NAV ACTIVE HIGHLIGHT
----------------------------------- */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop - 120 &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      document
        .querySelectorAll(".nav-links a")
        .forEach((l) => l.classList.remove("active"));

      const activeLink = document.querySelector(
        `.nav-links a[href="#${section.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

/* -----------------------------------
   BACK TO TOP BUTTON
----------------------------------- */
const backToTopBtn = document.createElement("button");
backToTopBtn.className = "back-to-top";
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* -----------------------------------
   SCROLL REVEAL
----------------------------------- */
const revealElements = document.querySelectorAll(
  "section, .job, .project-list li, .articles-list li"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("revealed");
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* -----------------------------------
   ACTIVE LINK STYLE INJECT
----------------------------------- */
const style = document.createElement("style");
style.innerHTML = `
.nav-links a.active {
  color: var(--accent);
  font-weight: 600;
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: var(--accent);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  font-size: 1.2rem;
  z-index: 999;
  transition: 0.3s;
}

.back-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.35);
}

section, .job, .project-list li, .articles-list li {
  opacity: 0;
  transform: translateY(30px);
  transition: 0.7s ease;
}

.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Fade transition */
html.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

html.fade-in {
  opacity: 1;
  transition: opacity 0.5s ease-in;
}
`;
document.head.appendChild(style);

/* -----------------------------------
   APPLE-STYLE PAGE FADE TRANSITION
----------------------------------- */

// Fade-in on page load
document.documentElement.classList.add("fade-in");

// Fade-out before opening external links
document.querySelectorAll(".project-list a, .articles-list a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const url = a.href;

    document.documentElement.classList.remove("fade-in");
    document.documentElement.classList.add("fade-out");

    setTimeout(() => {
      window.open(url, "_blank");
      document.documentElement.classList.remove("fade-out");
      document.documentElement.classList.add("fade-in");
    }, 350);
  });
});
