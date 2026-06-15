/* ==================================
   HOTEL MILKY - GALLERY LIGHTBOX
================================== */

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-item");

  const lightbox = document.getElementById("lightbox");

  const lightboxImg = document.getElementById("lightbox-img");

  const closeBtn = document.querySelector(".close-lightbox");

  let currentIndex = 0;

  /* ==========================
       CREATE NAVIGATION BUTTONS
    ========================== */

  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");

  prevBtn.innerHTML = "❮";
  nextBtn.innerHTML = "❯";

  prevBtn.className = "lightbox-nav prev";
  nextBtn.className = "lightbox-nav next";

  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);

  /* ==========================
       OPEN IMAGE
    ========================== */

  function openImage(index) {
    currentIndex = index;

    lightbox.style.display = "flex";

    document.body.style.overflow = "hidden";

    lightboxImg.src = images[currentIndex].src;

    lightboxImg.alt = images[currentIndex].alt;
  }

  /* ==========================
       CLOSE LIGHTBOX
    ========================== */

  function closeLightbox() {
    lightbox.style.display = "none";

    document.body.style.overflow = "auto";
  }

  /* ==========================
       NEXT IMAGE
    ========================== */

  function nextImage() {
    currentIndex++;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex].src;

    lightboxImg.alt = images[currentIndex].alt;
  }

  /* ==========================
       PREVIOUS IMAGE
    ========================== */

  function previousImage() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }

    lightboxImg.src = images[currentIndex].src;

    lightboxImg.alt = images[currentIndex].alt;
  }

  /* ==========================
       CLICK IMAGE TO OPEN
    ========================== */

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      openImage(index);
    });
  });

  /* ==========================
       BUTTON EVENTS
    ========================== */

  nextBtn.addEventListener("click", nextImage);

  prevBtn.addEventListener("click", previousImage);

  closeBtn.addEventListener("click", closeLightbox);

  /* ==========================
       CLICK OUTSIDE TO CLOSE
    ========================== */

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  /* ==========================
       KEYBOARD CONTROLS
    ========================== */

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") {
      return;
    }

    if (e.key === "Escape") {
      closeLightbox();
    }

    if (e.key === "ArrowRight") {
      nextImage();
    }

    if (e.key === "ArrowLeft") {
      previousImage();
    }
  });

  /* ==========================
       MOBILE SWIPE SUPPORT
    ========================== */

  let startX = 0;
  let endX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX;

    handleSwipe();
  });

  function handleSwipe() {
    const distance = startX - endX;

    if (distance > 50) {
      nextImage();
    }

    if (distance < -50) {
      previousImage();
    }
  }
});
