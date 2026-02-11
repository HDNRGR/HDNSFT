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

  // ----- Parent image → sub-images mapping -----
  const subImages = {
    "photo1.png": ["photo1-1.png","photo1-2.png","photo1-3.png","photo1-4.png","photo1-5.png","photo1-6.png","photo1-7.png","photo1-8.png","photo1-9.png"],
    "photo2.png": ["photo2-1.png","photo2-2.png","photo2-3.png","photo2-4.png"],
    "photo3.png": ["photo3-1.png","photo3-2.png","photo3-3.png","photo3-4.png","photo3-5.png","photo3-6.png"],
    "photo4.png": ["photo4-1.png","photo4-2.png","photo4-3.png"],
    "photo5.png": [],
    "photo6.png": [],
    "photo7.png": [],
    "photo8.png": []
  };

  // ----- Click on main + extra gallery images -----
  const allGalleryImages = document.querySelectorAll(".main-gallery img, .extra-gallery img");

  allGalleryImages.forEach(parentImg => {
    parentImg.addEventListener("click", () => {
      const src = "" + parentImg.src.split("/").pop();
      const imagesToShow = subImages[src];
      if (!imagesToShow) return;

      // Remove any existing overlay
      const existingOverlay = document.querySelector(".sub-images-overlay");
      if (existingOverlay) existingOverlay.remove();

      // Create overlay
      const overlay = document.createElement("div");
      overlay.classList.add("sub-images-overlay");
      overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.85); display:grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap:15px; padding:40px; overflow-y:auto; z-index:3000;
        align-content:start; cursor:default; backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
      `;

      // Add sub-images
      imagesToShow.forEach(subSrc => {
        const img = document.createElement("img");
        img.src = subSrc;
        img.style.cssText = `
          width:100%; border-radius:10px; cursor:pointer;
          transition: transform 0.3s ease;
        `;
        img.addEventListener("click", (e) => { e.stopPropagation(); openFullscreen(subSrc); });
        overlay.appendChild(img);
      });

      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

});

