document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      const icon = menuBtn.querySelector("i");

      if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // sticky navbar
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // back to top button
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // on scroll reveal
  const revealElements = document.querySelectorAll(
    ".room-card, .testimonial, .amenities-grid div, .about-preview img, .about-preview div",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up");
          entry.target.classList.add("show");
        }
      });
    },

    {
      threshold: 0.2,
    },
  );

  revealElements.forEach((el) => {
    el.classList.add("fade-up");
    revealObserver.observe(el);
  });

  // booking form
  const bookingForm = document.querySelector(".booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const checkIn = bookingForm.querySelectorAll("input[type='date']")[0];
      const checkOut = bookingForm.querySelectorAll("input[type='date']")[1];
      const guests = bookingForm.querySelector("select");

      if (!checkIn.value || !checkOut.value) {
        alert("Please select check-in and check-out dates.");
        return;
      }

      const checkInDate = new Date(checkIn.value);
      const checkOutDate = new Date(checkOut.value);

      if (checkOutDate <= checkInDate) {
        alert("Check-out date must be after check-in date.");
        return;
      }

      const message = `Is the room available for ${checkIn.value} to ${checkOut.value} for ${guests.value}?`;

      const whatsappUrl = `https://wa.me/9779861885157?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");

      bookingForm.reset();
    });
  }

  // active nav link
  const currentPage = window.location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.style.color = "#d4af37";
    }
  });

  // preload images
  const roomImages = document.querySelectorAll("img");

  roomImages.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
  });

  // current year autoupdate
  const yearElement = document.querySelector(".year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
