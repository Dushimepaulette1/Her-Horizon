// Admin authentication functionality

// Admin credentials (in a real app, this would be handled securely on the server)
const ADMIN_CREDENTIALS = {
  email: "admin@herhorizon.rw",
  password: "admin123",
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if already logged in as admin
  if (isAdminLoggedIn()) {
    window.location.href = "admin-dashboard.html";
    return;
  }

  setupAdminAuthEventListeners();
  setupPasswordToggle();
});

// Set up admin authentication event listeners
function setupAdminAuthEventListeners() {
  const adminLoginForm = document.getElementById("adminLoginForm");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", handleAdminLogin);
  }
}

// Handle admin login form submission
function handleAdminLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  // Basic validation
  if (!email || !password) {
    showAdminNotification("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showAdminNotification("Please enter a valid email address.", "error");
    return;
  }

  // Show loading
  showLoadingOverlay("Verifying credentials...");

  // Simulate API call
  setTimeout(() => {
    hideLoadingOverlay();

    // Check admin credentials
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Store admin session
      const adminData = {
        email: email,
        role: "admin",
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("herhorizon_admin", JSON.stringify(adminData));

      showAdminNotification(
        "Welcome, Admin! Redirecting to dashboard...",
        "success"
      );

      // Redirect to admin dashboard
      setTimeout(() => {
        window.location.href = "admin-dashboard.html";
      }, 1500);
    } else {
      showAdminNotification(
        "Invalid admin credentials. Please try again.",
        "error"
      );
    }
  }, 2000);
}

// Password toggle functionality
function setupPasswordToggle() {
  const toggleButton = document.getElementById("toggleAdminPassword");

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const input = document.getElementById("adminPassword");
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }
}

// Check if admin is logged in
function isAdminLoggedIn() {
  const adminData = localStorage.getItem("herhorizon_admin");
  if (adminData) {
    try {
      const admin = JSON.parse(adminData);
      return admin.role === "admin";
    } catch (e) {
      return false;
    }
  }
  return false;
}

// Admin logout function
function adminLogout() {
  localStorage.removeItem("herhorizon_admin");
  window.location.href = "admin-login.html";
}

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Loading overlay functions
function showLoadingOverlay(message = "Loading...") {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.querySelector("p").textContent = message;
    overlay.style.display = "flex";
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

// Admin notification system
function showAdminNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".admin-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `admin-notification admin-notification-${type}`;
  notification.innerHTML = `
        <div class="admin-notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
            <button class="admin-notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
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
        border: 1px solid ${
          type === "success"
            ? "#c3e6cb"
            : type === "error"
            ? "#f5c6cb"
            : "#bee5eb"
        };
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 10001;
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
  const closeBtn = notification.querySelector(".admin-notification-close");
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

// Add notification styles
const adminAuthStyle = document.createElement("style");
adminAuthStyle.textContent = `
    .admin-notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .admin-notification-close {
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        margin-left: auto;
        color: inherit;
    }
    
    .admin-notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(adminAuthStyle);

// Export functions for potential future use
window.HerHorizonAdmin = {
  isAdminLoggedIn,
  adminLogout,
  showAdminNotification,
};
