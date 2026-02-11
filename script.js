document.addEventListener("DOMContentLoaded", () => {

  // ----- Intersection Observer for scroll animations -----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-left, .fade-right, .fade-up, .experience')
    .forEach(el => observer.observe(el));

  // ----- Portfolio View Gallery toggle -----
  const btn = document.getElementById("viewGalleryBtn");
  const extraGallery = document.querySelector(".extra-gallery");

  if (btn && extraGallery) {
    btn.addEventListener("click", () => {
      extraGallery.classList.toggle("show");
      btn.textContent = extraGallery.classList.contains("show") ? "Show Less" : "View Gallery";
    });
  }

  // ----- Hero button scroll -----
  const hero = document.querySelector(".hero");
  const about = document.querySelector("#about");
  const vpBtn = document.querySelector(".hero .btn");

  if (vpBtn && hero && about) {
    vpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      hero.classList.add("fade-out");

      setTimeout(() => {
        window.scrollTo(0, about.offsetTop);
        about.classList.add("fade-in");

        setTimeout(() => {
          hero.classList.remove("fade-out");
          hero.classList.add("fade-in");
          setTimeout(() => hero.classList.remove("fade-in"), 900);
        }, 1200);
      }, 600);
    });
  }

  // ----- Scroll to top when clicking logo -----
  const logo = document.querySelector(".navbar .logo");
  if (logo) {
    logo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // ----- Fullscreen image function -----
  function openFullscreen(imgSrc) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.85); display:flex;
      align-items:center; justify-content:center; cursor:zoom-out;
      z-index:5000; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
    `;
    const fullImg = document.createElement("img");
    fullImg.src = imgSrc;
    fullImg.style.cssText = `
      width:auto; height:auto; max-width:95vw; max-height:95vh;
      border-radius:10px; box-shadow:0 0 30px rgba(0,0,0,0.5);
      transition: transform 0.3s ease; transform: scale(0.8);
    `;
    setTimeout(() => fullImg.style.transform = "scale(1)", 10);
    overlay.appendChild(fullImg);
    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  }

  // ----- Mobile click toggle for About / Experience boxes -----
  const clickableBoxes = document.querySelectorAll(".about-box, .experience-box");
  clickableBoxes.forEach(box => {
    box.addEventListener("click", () => {
      box.classList.toggle("unblur");
    });
  });

});
