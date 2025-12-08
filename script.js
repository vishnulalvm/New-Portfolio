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

// Navbar background on scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(255,255,255,0.95)";
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    nav.style.background = "rgba(255,255,255,0.8)";
    nav.style.boxShadow = "none";
  }
});

