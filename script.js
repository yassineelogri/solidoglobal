/* =========================================================
   Solido Global — Interactions
   File: script.js
   ========================================================= */

// ----------------------------
// Mobile menu toggle
// ----------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // close menu when a link is clicked (mobile)
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // close menu when user clicks outside
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInsideMenu =
      navLinks.contains(target) || navToggle.contains(target);

    if (!clickedInsideMenu) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ----------------------------
// Reveal on scroll (smooth section animations)
// ----------------------------
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
} else {
  // fallback (old browsers)
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ----------------------------
// Footer year
// ----------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ----------------------------
// Selector (Roadway / Sidewalk / Industrial)
// ----------------------------
const selectorResults = document.getElementById("selectorResults");
const chips = document.querySelectorAll(".chip");

const presets = {
  road: [
    ["Heavy-duty covers", "Recommended: C250 / D400 (road traffic)"],
    ["Anti-noise seating", "Optional gasket / silent seating systems"],
    ["Drainage options", "Gratings & channel solutions"],
  ],
  sidewalk: [
    ["Pedestrian covers", "Recommended: A15 / B125 (sidewalk zones)"],
    ["Safety surfaces", "Anti-slip finishing for pedestrians"],
    ["Light drainage", "Compact grating solutions"],
  ],
  industrial: [
    ["Extreme-duty covers", "Recommended: E600 / F900 (industrial zones)"],
    ["Reinforced frames", "High impact tolerance + stability"],
    ["Custom engineering", "Send BOQ/spec → recommended configuration"],
  ],
};

function renderResults(key) {
  if (!selectorResults) return;

  const rows = presets[key] || presets.road;

  selectorResults.innerHTML = rows
    .map(
      ([name, meta]) => `
      <div class="result">
        <div class="result-name">${name}</div>
        <div class="result-meta">${meta}</div>
      </div>
    `
    )
    .join("");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => {
      c.classList.remove("is-active");
      c.setAttribute("aria-selected", "false");
    });

    chip.classList.add("is-active");
    chip.setAttribute("aria-selected", "true");

    renderResults(chip.dataset.filter);
  });
});

// initial render
renderResults("road");

// ----------------------------
// RFQ mailto button (works on GitHub Pages for free)
// ----------------------------
const mailtoBtn = document.getElementById("mailtoBtn");

// ⚠️ Change this later to your real email
const SALES_EMAIL = "sales@solidoglobal.com";

function buildRFQMailto() {
  const subject = encodeURIComponent("RFQ — Manhole Covers / Drainage Solutions");

  const body = encodeURIComponent(
`Hello Solido Team,

Please quote the following:

1) Installation area (road / sidewalk / industrial):
2) Required load class (A15–F900):
3) Product type (round / square / rectangular / grating):
4) Size / frame depth:
5) Quantity:
6) Delivery country / city:
7) Branding / logo requirements (if any):
8) Required delivery date:
9) Any attached BOQ/spec (describe here):

Thank you,
Name:
Company:
Phone/WhatsApp:
`
  );

  return `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
}

if (mailtoBtn) {
  mailtoBtn.setAttribute("href", buildRFQMailto());
}

