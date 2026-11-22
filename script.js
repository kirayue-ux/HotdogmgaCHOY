// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });

  // Back-to-top button
  toTop.style.display = window.scrollY > 400 ? "block" : "none";
});

// Back to top
const toTop = document.getElementById("toTop");
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Footer year
document.getElementById("year").textContent = 2019;

// Feedback form (saved in browser localStorage)
const form = document.getElementById("feedbackForm");
const formMsg = document.getElementById("formMsg");
const feedbackList = document.getElementById("feedbackList");

function loadFeedbacks() {
  let data = [];
  try { data = JSON.parse(localStorage.getItem("feedbacks")) || []; } catch (e) {}
  feedbackList.innerHTML = "";
  if (data.length === 0) {
    feedbackList.innerHTML = "<p>Wala pay feedback. Mahimo ka nga una!</p>";
    return;
  }
  data.slice().reverse().forEach((f) => {
    const div = document.createElement("div");
    div.className = "feedback-item";
    const strong = document.createElement("strong");
    strong.textContent = f.name;
    const p = document.createElement("p");
    p.textContent = f.message;
    div.append(strong, p);
    feedbackList.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "Palihug i-fill up ang tanan.";
    formMsg.className = "form-msg error";
    return;
  }

  let data = [];
  try { data = JSON.parse(localStorage.getItem("feedbacks")) || []; } catch (e) {}
  data.push({ name, email, message });
  try { localStorage.setItem("feedbacks", JSON.stringify(data)); } catch (e) {}

  formMsg.textContent = "Salamat sa imong feedback! 🌭";
  formMsg.className = "form-msg ok";
  form.reset();
  loadFeedbacks();
});

loadFeedbacks();

// Portfolio viewer (opens activity/exercise pages in a popup)
const viewer = document.getElementById("viewer");
const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");

function closeViewer() {
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  viewerFrame.src = "about:blank";
}

document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    viewerTitle.textContent = btn.dataset.title;
    viewerFrame.src = btn.dataset.src;
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
  });
});

document.getElementById("viewerClose").addEventListener("click", closeViewer);
viewer.addEventListener("click", (e) => { if (e.target === viewer) closeViewer(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeViewer(); });
