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
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* -----------------------------------
   SCROLL REVEAL (STAGGERED)
----------------------------------- */
const revealElements = document.querySelectorAll(
  "section, .job, .project-list li, .articles-list li, .skills-list li"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Stagger children if it's a list
        const children = entry.target.querySelectorAll("li");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("revealed");
          }, index * 100);
        });
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* -----------------------------------
   ACTIVE LINK STYLE INJECT -> MOVED TO CSS
----------------------------------- */

/* -----------------------------------
   APPLE-STYLE PAGE FADE TRANSITION
----------------------------------- */
// Fade-in on page load
document.documentElement.classList.add("fade-in");

// Removed unnecessary fade-out logic for external links
