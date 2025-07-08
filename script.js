// Enhanced opportunities data with more realistic entries
const opportunitiesData = [
  {
    id: 1,
    title: "MasterCard Foundation Scholars Program",
    category: "Education",
    description:
      "Full scholarship program for academically talented yet economically disadvantaged young people from Africa to pursue undergraduate and graduate studies at leading universities worldwide.",
    deadline: "March 15, 2024",
    applyUrl: "https://mastercardfdn.org/scholars/",
    featured: true,
  },
  {
    id: 2,
    title: "Google Women Techmakers Program",
    category: "Skills",
    description:
      "A program that provides visibility, community, and resources for women in technology to drive innovation and participation in the field through workshops, mentorship, and networking.",
    deadline: "April 30, 2024",
    applyUrl: "https://developers.google.com/womentechmakers",
    featured: true,
  },
  {
    id: 3,
    title: "UN Women Rwanda Internship",
    category: "Career",
    description:
      "Internship opportunity with UN Women Rwanda to support gender equality and women's empowerment initiatives in the country. Gain hands-on experience in development work.",
    deadline: "February 28, 2024",
    applyUrl: "https://www.unwomen.org/en/about-us/employment",
    featured: false,
  },
  {
    id: 4,
    title: "She Code Africa Mentorship Program",
    category: "Mentorship",
    description:
      "A mentorship program connecting young African women with experienced professionals in technology and entrepreneurship. Includes career guidance and skill development.",
    deadline: "May 20, 2024",
    applyUrl: "https://shecodeafrica.org/mentorship",
    featured: true,
  },
  {
    id: 5,
    title: "YALI Regional Leadership Center",
    category: "Skills",
    description:
      "Leadership development program for young African leaders focusing on business, civic leadership, and public management. Includes networking opportunities and practical training.",
    deadline: "June 10, 2024",
    applyUrl: "https://yali.state.gov/rlc/",
    featured: false,
  },
  {
    id: 6,
    title: "African Development Bank Scholarship",
    category: "Education",
    description:
      "Scholarship program for African students to pursue master's degrees in development-related fields at participating universities. Covers tuition, living expenses, and travel costs.",
    deadline: "January 31, 2024",
    applyUrl: "https://www.afdb.org/en/about-us/careers/scholarship-program",
    featured: false,
  },
  {
    id: 7,
    title: "TechWomen Program",
    category: "Mentorship",
    description:
      "Professional mentorship and exchange program that empowers, connects, and supports the next generation of women leaders in STEM fields through hands-on learning.",
    deadline: "March 1, 2024",
    applyUrl: "https://www.techwomen.org/",
    featured: true,
  },
  {
    id: 8,
    title: "Andela Technical Leadership Program",
    category: "Career",
    description:
      "Intensive program designed to develop technical leadership skills and connect talented developers with global opportunities in leading technology companies.",
    deadline: "April 15, 2024",
    applyUrl: "https://andela.com/careers/",
    featured: false,
  },
  {
    id: 9,
    title: "Digital Skills for Africa Initiative",
    category: "Skills",
    description:
      "Free digital skills training program covering web development, digital marketing, and data analysis for African youth. Includes certification and job placement support.",
    deadline: "Ongoing",
    applyUrl: "https://www.digitalskillsafrica.com/",
    featured: false,
  },
  {
    id: 10,
    title: "Women in Tech Rwanda Bootcamp",
    category: "Skills",
    description:
      "Intensive coding bootcamp specifically designed for women in Rwanda, covering full-stack web development and mobile app development with job placement assistance.",
    deadline: "February 15, 2024",
    applyUrl: "https://womenintech.rw/bootcamp",
    featured: true,
  },
  {
    id: 11,
    title: "Chevening Scholarships",
    category: "Education",
    description:
      "UK government's global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations, for one-year master's degrees in the UK.",
    deadline: "November 2, 2024",
    applyUrl: "https://www.chevening.org/",
    featured: true,
  },
  {
    id: 12,
    title: "Microsoft AI for Good Program",
    category: "Skills",
    description:
      "Program focused on empowering individuals and organizations to solve global challenges using artificial intelligence and machine learning technologies.",
    deadline: "May 30, 2024",
    applyUrl: "https://www.microsoft.com/en-us/ai/ai-for-good",
    featured: false,
  },
];

// Global variables
let filteredOpportunities = [...opportunitiesData];
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
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  if (AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  // Simulate loading delay for better UX
  setTimeout(() => {
    hideLoading();
    displayOpportunities(opportunitiesData);
    animateCounters();
  }, 1500);

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
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  // Filter functionality
  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleFilter);
  }

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  // Close mobile menu when clicking on nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Back to top button
  if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop);
    backToTop.addEventListener("click", scrollToTop);
  }

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll);

  // Intersection Observer for animations
  setupIntersectionObserver();
}

// Handle search functionality
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

// Display opportunities in the grid
function displayOpportunities(opportunities) {
  if (!opportunitiesGrid) return;

  if (opportunities.length === 0) {
    showNoResults();
    return;
  }

  hideNoResults();

  // Sort opportunities to show featured ones first
  const sortedOpportunities = opportunities.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  opportunitiesGrid.innerHTML = sortedOpportunities
    .map(
      (opportunity) => `
        <div class="opportunity-card ${
          opportunity.featured ? "featured" : ""
        }" data-aos="fade-up">
            ${
              opportunity.featured
                ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured</div>'
                : ""
            }
            <span class="opportunity-category">${opportunity.category}</span>
            <h3 class="opportunity-title">${opportunity.title}</h3>
            <p class="opportunity-description">${opportunity.description}</p>
            <div class="opportunity-deadline">
                <i class="fas fa-calendar-alt"></i>
                <span>Deadline: ${opportunity.deadline}</span>
            </div>
            <a href="${
              opportunity.applyUrl
            }" target="_blank" rel="noopener noreferrer" class="apply-button">
                Apply Now <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `
    )
    .join("");

  // Re-initialize AOS for new elements
  if (AOS) {
    AOS.refresh();
  }
}

// Show/hide loading state
function hideLoading() {
  if (loading) loading.style.display = "none";
}

function showLoading() {
  if (loading) loading.style.display = "block";
}

// Show/hide no results message
function showNoResults() {
  if (opportunitiesGrid) opportunitiesGrid.innerHTML = "";
  if (noResults) noResults.style.display = "block";
}

function hideNoResults() {
  if (noResults) noResults.style.display = "none";
}

// Mobile menu functionality
function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Animate hamburger bars
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
  if (hamburger && navMenu) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");

    // Reset hamburger bars
    const bars = hamburger.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    });
  }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        closeMobileMenu();
      }
    });
  });
}

// View toggle functionality
function setupViewToggle() {
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const view = this.dataset.view;

      // Update active button
      viewButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Update grid class
      if (opportunitiesGrid) {
        opportunitiesGrid.className =
          view === "list"
            ? "opportunities-grid list-view"
            : "opportunities-grid";
      }

      currentView = view;
    });
  });
}

// Newsletter form setup
function setupNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;
      const submitBtn = this.querySelector(".subscribe-btn");
      const originalText = submitBtn.textContent;

      // Simple validation
      if (!email) {
        showNotification("Please enter your email address.", "error");
        return;
      }

      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showNotification(
          "Thank you for subscribing! You will receive updates about new opportunities.",
          "success"
        );
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Contact form setup
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      // Simple validation
      const name =
        formData.get("name") || this.querySelector('input[name="name"]').value;
      const email =
        formData.get("email") ||
        this.querySelector('input[name="email"]').value;
      const message =
        formData.get("message") ||
        this.querySelector('textarea[name="message"]').value;

      if (!name || !email || !message) {
        showNotification("Please fill in all fields.", "error");
        return;
      }

      submitBtn.innerHTML =
        '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showNotification(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Back to top functionality
function toggleBackToTop() {
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
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
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 238, 248, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 20px rgba(214, 51, 132, 0.15)";
    } else {
      navbar.style.background = "rgba(255, 238, 248, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 20px rgba(214, 51, 132, 0.1)";
    }
  }
}

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + (target >= 1000 ? "+" : "");
    }, 16);
  });
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

  // Observe elements with animation classes
  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
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

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#d4edda"
            : type === "error"
            ? "#f8d7da"
            : "#d1ecf1"
        };
        color: ${
          type === "success"
            ? "#155724"
            : type === "error"
            ? "#721c24"
            : "#0c5460"
        };
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Utility functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function isDeadlineApproaching(deadline) {
  if (deadline === "Ongoing") return false;

  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff <= 7 && daysDiff > 0;
}

function sortByDeadline(opportunities) {
  return opportunities.sort((a, b) => {
    if (a.deadline === "Ongoing") return 1;
    if (b.deadline === "Ongoing") return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });
}

// Add featured badge styles
const style = document.createElement("style");
style.textContent = `
    .opportunity-card.featured {
        border: 2px solid #d63384;
        position: relative;
    }
    
    .featured-badge {
        position: absolute;
        top: -10px;
        right: 20px;
        background: linear-gradient(135deg, #d63384 0%, #6c5ce7 100%);
        color: white;
        padding: 5px 15px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
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
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Export functions for potential future use
window.HerHorizonApp = {
  opportunitiesData,
  filteredOpportunities,
  displayOpportunities,
  filterAndDisplayOpportunities,
  showNotification,
  formatDate,
  isDeadlineApproaching,
  sortByDeadline,
};
