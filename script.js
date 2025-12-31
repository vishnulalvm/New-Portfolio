// Mobile menu functionality
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

// Project showcase functionality
function showProject(projectId) {
  // Hide all showcases
  document.querySelectorAll(".project-showcase").forEach((showcase) => {
    showcase.classList.remove("active");
  });

  // Remove active from all icons
  document.querySelectorAll(".project-icon").forEach((icon) => {
    icon.classList.remove("active");
  });

  // Show selected showcase
  const selectedShowcase = document.getElementById("showcase-" + projectId);
  if (selectedShowcase) {
    selectedShowcase.classList.add("active");
  }

  // Add active to selected icon
  const selectedIcon = document.querySelector('[data-project="' + projectId + '"]');
  if (selectedIcon) {
    selectedIcon.classList.add("active");
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Event Listener
    const menuToggleBtn = document.getElementById('menuToggle');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }

    // Project Icons Event Listeners
    const projectIcons = document.querySelectorAll('.project-icon');
    projectIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const projectId = icon.getAttribute('data-project');
            showProject(projectId);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.getElementById("navLinks");
        const menuToggle = document.getElementById("menuToggle");
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Observe elements for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        ".skill-card, .highlight-card, .timeline-item, .contact-card, .project-card, .blog-card"
    ).forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      const navLinks = document.getElementById("navLinks");
      if (navLinks.classList.contains("active")) {
          toggleMenu();
      }
    }
  });
});

// Navbar frosted glass effect on scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Screenshot Lightbox (Mobile Only)
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('screenshot-modal');
  const modalImage = modal.querySelector('.modal-image');
  const modalClose = modal.querySelector('.modal-close');
  const modalCounter = modal.querySelector('.modal-counter');

  let currentImages = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Check if mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Open lightbox
  function openLightbox(imageSrc, index, imagesArray) {
    if (!isMobile()) return; // Only on mobile

    currentImages = imagesArray;
    currentIndex = index;

    modalImage.src = imageSrc;
    modalCounter.textContent = `${index + 1} / ${imagesArray.length}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  // Close lightbox
  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }

  // Navigate to next/previous image
  function navigateImage(direction) {
    currentIndex += direction;

    // Loop around
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    if (currentIndex >= currentImages.length) currentIndex = 0;

    modalImage.src = currentImages[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  // Add click listeners to all screenshots
  document.querySelectorAll('.project-showcase').forEach(showcase => {
    const screenshots = Array.from(showcase.querySelectorAll('.screenshot img'));

    screenshots.forEach((img, index) => {
      img.addEventListener('click', () => {
        if (isMobile()) {
          const imageSrcs = screenshots.map(s => s.src);
          openLightbox(img.src, index, imageSrcs);
        }
      });
    });
  });

  // Close button
  modalClose.addEventListener('click', closeLightbox);

  // Click backdrop to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Touch swipe navigation
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next image
        navigateImage(1);
      } else {
        // Swiped right - previous image
        navigateImage(-1);
      }
    }
  }

  // Keyboard navigation (ESC to close, arrows to navigate)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
  });
});


