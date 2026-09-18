(function () {
  var roles = [
    "Geoinformatics Student",
    "Urban Mobility Researcher"
  ];
  var el = document.getElementById("typed");
  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeTick() {
    if (!el) return;
    if (reduceMotion) {
      el.textContent = roles[0];
      return;
    }
    var current = roles[roleIndex];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeTick, 1400);
        return;
      }
      setTimeout(typeTick, 85);
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeTick, 350);
        return;
      }
      setTimeout(typeTick, 45);
    }
  }
  typeTick();

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
  }

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
    });
  });

  var sections = ["hero", "about", "resume", "awards"].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function setActive() {
    var y = window.scrollY + 120;
    var current = "hero";
    sections.forEach(function (sec) {
      if (sec.offsetTop <= y) current = sec.id;
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-section") === current);
    });
    var back = document.getElementById("backTop");
    if (back) back.classList.toggle("show", window.scrollY > 400);
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
