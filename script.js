// Sample opportunities data - In a real application, this would come from an API or database
const opportunitiesData = [
  {
    id: 1,
    title: "MasterCard Foundation Scholars Program",
    category: "Education",
    description:
      "Full scholarship program for academically talented yet economically disadvantaged young people from Africa to pursue undergraduate and graduate studies.",
    deadline: "March 15, 2024",
    applyUrl: "https://mastercardfdn.org/scholars/",
  },
  {
    id: 2,
    title: "Google Women Techmakers Program",
    category: "Skills",
    description:
      "A program that provides visibility, community, and resources for women in technology to drive innovation and participation in the field.",
    deadline: "April 30, 2024",
    applyUrl: "https://developers.google.com/womentechmakers",
  },
  {
    id: 3,
    title: "UN Women Rwanda Internship",
    category: "Career",
    description:
      "Internship opportunity with UN Women Rwanda to support gender equality and women's empowerment initiatives in the country.",
    deadline: "February 28, 2024",
    applyUrl: "https://www.unwomen.org/en/about-us/employment",
  },
  {
    id: 4,
    title: "She Code Africa Mentorship Program",
    category: "Mentorship",
    description:
      "A mentorship program connecting young African women with experienced professionals in technology and entrepreneurship.",
    deadline: "May 20, 2024",
    applyUrl: "https://shecodeafrica.org/mentorship",
  },
  {
    id: 5,
    title: "YALI Regional Leadership Center",
    category: "Skills",
    description:
      "Leadership development program for young African leaders focusing on business, civic leadership, and public management.",
    deadline: "June 10, 2024",
    applyUrl: "https://yali.state.gov/rlc/",
  },
  {
    id: 6,
    title: "African Development Bank Scholarship",
    category: "Education",
    description:
      "Scholarship program for African students to pursue master's degrees in development-related fields at participating universities.",
    deadline: "January 31, 2024",
    applyUrl: "https://www.afdb.org/en/about-us/careers/scholarship-program",
  },
  {
    id: 7,
    title: "TechWomen Program",
    category: "Mentorship",
    description:
      "Professional mentorship and exchange program that empowers, connects, and supports the next generation of women leaders in STEM.",
    deadline: "March 1, 2024",
    applyUrl: "https://www.techwomen.org/",
  },
  {
    id: 8,
    title: "Andela Technical Leadership Program",
    category: "Career",
    description:
      "Intensive program designed to develop technical leadership skills and connect talented developers with global opportunities.",
    deadline: "April 15, 2024",
    applyUrl: "https://andela.com/careers/",
  },
  {
    id: 9,
    title: "Digital Skills for Africa Initiative",
    category: "Skills",
    description:
      "Free digital skills training program covering web development, digital marketing, and data analysis for African youth.",
    deadline: "Ongoing",
    applyUrl: "https://www.digitalskillsafrica.com/",
  },
  {
    id: 10,
    title: "Women in Tech Rwanda Bootcamp",
    category: "Skills",
    description:
      "Intensive coding bootcamp specifically designed for women in Rwanda, covering full-stack web development and mobile app development.",
    deadline: "February 15, 2024",
    applyUrl: "https://womenintech.rw/bootcamp",
  },
];

// Global variables
let filteredOpportunities = [...opportunitiesData];
let currentFilter = "all";
let currentSearch = "";

// DOM elements
const opportunitiesGrid = document.getElementById("opportunitiesGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Simulate loading delay for better UX
  setTimeout(() => {
    hideLoading();
    displayOpportunities(opportunitiesData);
  }, 1000);

  // Set up event listeners
  setupEventListeners();

  // Set up smooth scrolling for navigation links
  setupSmoothScrolling();
});

// Set up all event listeners
function setupEventListeners() {
  // Search functionality
  searchInput.addEventListener("input", handleSearch);

  // Filter functionality
  categoryFilter.addEventListener("change", handleFilter);

  // Mobile menu toggle
  hamburger.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking on nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Contact form submission
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
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
      opportunity.description.toLowerCase().includes(currentSearch);

    const matchesCategory =
      currentFilter === "all" || opportunity.category === currentFilter;

    return matchesSearch && matchesCategory;
  });

  displayOpportunities(filteredOpportunities);
}

// Display opportunities in the grid
function displayOpportunities(opportunities) {
  if (opportunities.length === 0) {
    showNoResults();
    return;
  }

  hideNoResults();

  opportunitiesGrid.innerHTML = opportunities
    .map(
      (opportunity) => `
        <div class="opportunity-card">
            <span class="opportunity-category">${opportunity.category}</span>
            <h3 class="opportunity-title">${opportunity.title}</h3>
            <p class="opportunity-description">${opportunity.description}</p>
            <div class="opportunity-deadline">
                <i class="fas fa-calendar-alt"></i>
                <span>Deadline: ${opportunity.deadline}</span>
            </div>
            <a href="${opportunity.applyUrl}" target="_blank" rel="noopener noreferrer" class="apply-button">
                Apply Now <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `
    )
    .join("");
}

// Show/hide loading state
function hideLoading() {
  loading.style.display = "none";
}

function showLoading() {
  loading.style.display = "block";
}

// Show/hide no results message
function showNoResults() {
  opportunitiesGrid.innerHTML = "";
  noResults.style.display = "block";
}

function hideNoResults() {
  noResults.style.display = "none";
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
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");

  // Reset hamburger bars
  const bars = hamburger.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.style.transform = "none";
    bar.style.opacity = "1";
  });
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
      }
    });
  });
}

// Handle contact form submission
function handleContactForm(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const name =
    formData.get("name") || e.target.querySelector('input[type="text"]').value;
  const email =
    formData.get("email") ||
    e.target.querySelector('input[type="email"]').value;
  const message =
    formData.get("message") || e.target.querySelector("textarea").value;

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate form submission
  const submitBtn = e.target.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.");
    e.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Add scroll effect to navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 238, 248, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background =
      "linear-gradient(135deg, #ffeef8 0%, #f8e8ff 100%)";
    navbar.style.backdropFilter = "none";
  }
});

// Add animation on scroll for opportunity cards
function animateOnScroll() {
  const cards = document.querySelectorAll(".opportunity-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Call animation function when opportunities are displayed
const originalDisplayOpportunities = displayOpportunities;
displayOpportunities = function (opportunities) {
  originalDisplayOpportunities(opportunities);
  setTimeout(animateOnScroll, 100);
};

// Add some utility functions for future enhancements

// Function to add new opportunity (for future admin functionality)
function addOpportunity(opportunity) {
  opportunity.id = opportunitiesData.length + 1;
  opportunitiesData.push(opportunity);
  filterAndDisplayOpportunities();
}

// Function to format date for better display
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Function to check if deadline is approaching (within 7 days)
function isDeadlineApproaching(deadline) {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff <= 7 && daysDiff > 0;
}

// Function to sort opportunities by deadline
function sortByDeadline(opportunities) {
  return opportunities.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
}

// Export functions for potential future use
window.HerHorizonApp = {
  addOpportunity,
  formatDate,
  isDeadlineApproaching,
  sortByDeadline,
  opportunitiesData,
};
