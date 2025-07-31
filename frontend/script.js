// Global variables
let opportunitiesData = [];
let filteredOpportunities = [];
let currentFilter = "all";
let currentSearch = "";
let currentView = "grid";

// DOM elements
const opportunitiesGrid = document.getElementById("opportunitiesGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const backToTop = document.getElementById("backToTop");

// Import AOS library
const AOS = window.AOS;

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  showLoading();

  try {
    // Fetch opportunities from backend API
    const response = await fetch(
      "https://her-horizon.onrender.com/api/opportunities"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    opportunitiesData = await response.json();
    filteredOpportunities = [...opportunitiesData];
  } catch (error) {
    console.error("Failed to load opportunities:", error);
    showNotification("Failed to load opportunities from server.", "error");
    opportunitiesData = [];
    filteredOpportunities = [];
  }

  // Initialize AOS (Animate On Scroll)
  if (AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  hideLoading();

  displayOpportunities(filteredOpportunities);
  animateCounters();

  // Set up event listeners
  setupEventListeners();

  // Set up smooth scrolling for navigation links
  setupSmoothScrolling();

  // Initialize view toggle
  setupViewToggle();

  // Setup newsletter form
  setupNewsletterForm();

  // Setup contact form
  setupContactForm();
});

// Set up all event listeners
function setupEventListeners() {
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleFilter);
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop);
    backToTop.addEventListener("click", scrollToTop);
  }

  window.addEventListener("scroll", handleNavbarScroll);

  setupIntersectionObserver();
}

// Handle search input
function handleSearch(e) {
  currentSearch = e.target.value.toLowerCase().trim();
  filterAndDisplayOpportunities();
}

// Handle category filter
function handleFilter(e) {
  currentFilter = e.target.value;
  filterAndDisplayOpportunities();
}

// Filter opportunities based on search and category
function filterAndDisplayOpportunities() {
  filteredOpportunities = opportunitiesData.filter((opportunity) => {
    const matchesSearch =
      currentSearch === "" ||
      opportunity.title.toLowerCase().includes(currentSearch) ||
      opportunity.description.toLowerCase().includes(currentSearch) ||
      opportunity.category.toLowerCase().includes(currentSearch);

    const matchesCategory =
      currentFilter === "all" || opportunity.category === currentFilter;

    return matchesSearch && matchesCategory;
  });

  displayOpportunities(filteredOpportunities);
}

// Display opportunities
function displayOpportunities(opportunities) {
  if (!opportunitiesGrid) return;

  if (opportunities.length === 0) {
    showNoResults();
    return;
  }

  hideNoResults();

  opportunitiesGrid.innerHTML = opportunities
    .map(
      (opportunity) => `
        <div class="opportunity-card" data-aos="fade-up">
            <span class="opportunity-category">${opportunity.category}</span>
            <h3 class="opportunity-title">${opportunity.title}</h3>
            <p class="opportunity-description">${opportunity.description}</p>
            <div class="opportunity-deadline">
                <i class="fas fa-calendar-alt"></i>
                <span>Deadline: ${opportunity.date}</span>
            </div>
            <a href="${opportunity.link}" target="_blank" rel="noopener noreferrer" class="apply-button">
                <span>Apply Now</span>
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `
    )
    .join("");

  if (AOS) {
    AOS.refresh();
  }
}

// Show/hide loading spinner
function showLoading() {
  if (loading) {
    loading.style.display = "block";
  }
}

function hideLoading() {
  if (loading) {
    loading.style.display = "none";
  }
}

// Show/hide no results message
function showNoResults() {
  if (opportunitiesGrid) {
    opportunitiesGrid.style.display = "none";
  }
  if (noResults) {
    noResults.style.display = "block";
  }
}

function hideNoResults() {
  if (opportunitiesGrid) {
    opportunitiesGrid.style.display = "grid";
  }
  if (noResults) {
    noResults.style.display = "none";
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  const bars = hamburger.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    if (hamburger.classList.contains("active")) {
      if (index === 0)
        bar.style.transform = "rotate(-45deg) translate(-5px, 6px)";
      if (index === 1) bar.style.opacity = "0";
      if (index === 2)
        bar.style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    }
  });
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");

  const bars = hamburger.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.style.transform = "none";
    bar.style.opacity = "1";
  });
}

// Back to top button
function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 238, 248, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(102, 126, 234, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 238, 248, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(102, 126, 234, 0.1)";
  }
}

// Smooth scrolling for nav links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// View toggle (grid/list)
function setupViewToggle() {
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      viewButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const viewType = this.getAttribute("data-view");
      currentView = viewType;

      if (opportunitiesGrid) {
        if (viewType === "list") {
          opportunitiesGrid.classList.add("list-view");
        } else {
          opportunitiesGrid.classList.remove("list-view");
        }
      }
    });
  });
}

// Animate counters (if any)
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// Newsletter form setup
function setupNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      showNotification(
        "Thank you for subscribing! You'll receive updates about new opportunities.",
        "success"
      );

      this.reset();
    });
  }
}

// Contact form setup
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Thank you for your message! We'll get back to you soon.",
          "success"
        );

        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Notification system
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${
        type === "success"
          ? "fa-check-circle"
          : type === "error"
          ? "fa-exclamation-circle"
          : "fa-info-circle"
      }"></i>
      <span>${message}</span>
      <button class="notification-close"><i class="fas fa-times"></i></button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success" ? "#d4edda" : type === "error" ? "#f8d7da" : "#d1ecf1"
    };
    color: ${
      type === "success" ? "#155724" : type === "error" ? "#721c24" : "#0c5460"
    };
    border: 1px solid ${
      type === "success" ? "#c3e6cb" : type === "error" ? "#f5c6cb" : "#bee5eb"
    };
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Notification styles
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .notification-close {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    margin-left: auto;
    color: inherit;
  }

  .notification-close:hover {
    opacity: 1;
  }
`;
document.head.appendChild(notificationStyle);
