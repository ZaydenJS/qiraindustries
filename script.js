// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize preloader
  initPreloader();

  // Initialize all functionality
  initMobileMenu();
  initSmoothScrolling();
  initScrollEffects();
  initContactForm();
  initGallery();
  initAnimations();

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }
});

// Preloader functionality
function initPreloader() {
  const preloader = document.querySelector(".preloader");

  if (preloader) {
    // Simulate loading time
    setTimeout(() => {
      preloader.classList.add("fade-out");

      // Remove preloader after animation
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 2500);
  }
}

// Mobile Menu Functionality
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll(".bar");
    if (hamburger.classList.contains("active")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });

  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");

      // Reset hamburger bars
      const bars = hamburger.querySelectorAll(".bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    });
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link");
  const ctaButtons = document.querySelectorAll('a[href^="#"]');

  [...navLinks, ...ctaButtons].forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Scroll Effects (Header background, Active nav links)
function initScrollEffects() {
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;

    // Header background effect
    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }

    // Active navigation link highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Contact Form Functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const address = formData.get("address");
      const phone = formData.get("phone");
      const message = formData.get("message");

      // Basic validation
      if (!name || !email) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showNotification(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Gallery Functionality
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryImages = Array.from(galleryItems).map((item) => {
    const img = item.querySelector("img");
    return {
      src: img.src,
      alt: img.alt,
    };
  });

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      openLightbox(index, galleryImages);
    });
  });
}

// Lightbox functionality
function openLightbox(currentIndex, galleryImages) {
  let currentImageIndex = currentIndex;

  // Create lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${galleryImages[currentImageIndex].src}" alt="${galleryImages[currentImageIndex].alt}">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#8249;</button>
            <button class="lightbox-next">&#8250;</button>
        </div>
    `;

  // Add styles
  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const lightboxContent = lightbox.querySelector(".lightbox-content");
  lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

  const lightboxImg = lightbox.querySelector("img");
  lightboxImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;

  const closeButton = lightbox.querySelector(".lightbox-close");
  closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        z-index: 1001;
    `;

  const prevButton = lightbox.querySelector(".lightbox-prev");
  prevButton.style.cssText = `
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 16px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
        transition: background 0.3s ease, opacity 0.3s ease;
        opacity: 0.7;
    `;

  const nextButton = lightbox.querySelector(".lightbox-next");
  nextButton.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 16px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
        transition: background 0.3s ease, opacity 0.3s ease;
        opacity: 0.7;
    `;

  // Add hover effects
  prevButton.addEventListener("mouseenter", () => {
    prevButton.style.opacity = "1";
    prevButton.style.background = "rgba(0, 0, 0, 0.8)";
  });
  prevButton.addEventListener("mouseleave", () => {
    prevButton.style.opacity = "0.7";
    prevButton.style.background = "rgba(0, 0, 0, 0.5)";
  });

  nextButton.addEventListener("mouseenter", () => {
    nextButton.style.opacity = "1";
    nextButton.style.background = "rgba(0, 0, 0, 0.8)";
  });
  nextButton.addEventListener("mouseleave", () => {
    nextButton.style.opacity = "0.7";
    nextButton.style.background = "rgba(0, 0, 0, 0.5)";
  });

  // Add to DOM
  document.body.appendChild(lightbox);

  // Animate in
  setTimeout(() => {
    lightbox.style.opacity = "1";
  }, 10);

  // Navigation functionality
  function updateImage() {
    const lightboxImg = lightbox.querySelector("img");
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;

    // Update button visibility
    prevButton.style.display = currentImageIndex === 0 ? "none" : "flex";
    nextButton.style.display =
      currentImageIndex === galleryImages.length - 1 ? "none" : "flex";
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateImage();
    }
  }

  function showNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
      currentImageIndex++;
      updateImage();
    }
  }

  // Initialize button visibility
  updateImage();

  // Navigation event listeners
  prevButton.addEventListener("click", showPrevImage);
  nextButton.addEventListener("click", showNextImage);

  // Close functionality
  function closeLightbox() {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      if (lightbox.parentNode) {
        lightbox.remove();
      }
    }, 300);
  }

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  function handleKeydown(e) {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  }

  document.addEventListener("keydown", handleKeydown);

  // Clean up event listener when lightbox is closed
  const originalCloseLightbox = closeLightbox;
  closeLightbox = function () {
    document.removeEventListener("keydown", handleKeydown);
    originalCloseLightbox();
  };
}

// Scroll Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .feature-card, .gallery-item, .contact-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);
}

// Utility function to throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced scroll animations
function initEnhancedAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .feature-card, .gallery-item, .contact-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Add smooth reveal animations on scroll
window.addEventListener(
  "scroll",
  throttle(function () {
    const reveals = document.querySelectorAll(".service-card, .feature-card");

    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("animate-in");
      }
    });
  }, 100)
);

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
  initEnhancedAnimations();

  // Add loading styles
  const loadingStyle = document.createElement("style");
  loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #2c5aa0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body.loaded::before {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s ease;
        }
    `;
  document.head.appendChild(loadingStyle);
});
