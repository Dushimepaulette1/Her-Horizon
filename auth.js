// Authentication functionality for login and signup pages

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupAuthEventListeners();
  setupPasswordToggle();
  setupPasswordStrength();
  setupGoogleAuth();
});

// Set up all authentication event listeners
function setupAuthEventListeners() {
  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Signup form
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  // Password confirmation validation
  const confirmPassword = document.getElementById("confirmPassword");
  if (confirmPassword) {
    confirmPassword.addEventListener("input", validatePasswordMatch);
  }
}

// Handle login form submission
function handleLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const remember = formData.get("remember");

  // Basic validation
  if (!email || !password) {
    showAuthNotification("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showAuthNotification("Please enter a valid email address.", "error");
    return;
  }

  // Show loading
  showLoadingOverlay("Signing you in...");

  // Simulate API call
  setTimeout(() => {
    // In a real app, you would make an API call here
    hideLoadingOverlay();

    // Simulate successful login
    if (email === "demo@herhorizon.rw" && password === "demo123") {
      showAuthNotification(
        "Welcome back! Redirecting to dashboard...",
        "success"
      );

      // Store user session (in real app, use secure tokens)
      const userData = {
        email: email,
        name: "Demo User",
        loginTime: new Date().toISOString(),
        remember: remember,
      };

      if (remember) {
        localStorage.setItem("herhorizon_user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("herhorizon_user", JSON.stringify(userData));
      }

      // Redirect to main page
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      showAuthNotification(
        "Invalid email or password. Try demo@herhorizon.rw / demo123",
        "error"
      );
    }
  }, 2000);
}

// Handle signup form submission
function handleSignup(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const interests = formData.get("interests");
  const terms = formData.get("terms");
  const newsletter = formData.get("newsletter");

  // Validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !interests
  ) {
    showAuthNotification("Please fill in all required fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showAuthNotification("Please enter a valid email address.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showAuthNotification("Passwords do not match.", "error");
    return;
  }

  if (!isStrongPassword(password)) {
    showAuthNotification(
      "Password must be at least 8 characters with uppercase, lowercase, and numbers.",
      "error"
    );
    return;
  }

  if (!terms) {
    showAuthNotification(
      "Please accept the Terms of Service and Privacy Policy.",
      "error"
    );
    return;
  }

  // Show loading
  showLoadingOverlay("Creating your account...");

  // Simulate API call
  setTimeout(() => {
    hideLoadingOverlay();

    // Simulate successful signup
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      interests: interests,
      newsletter: newsletter,
      signupTime: new Date().toISOString(),
    };

    // Store user data
    localStorage.setItem("herhorizon_user", JSON.stringify(userData));

    showAuthNotification(
      "Account created successfully! Welcome to HerHorizon!",
      "success"
    );

    // Redirect to main page
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }, 2500);
}

// Password toggle functionality
function setupPasswordToggle() {
  const toggleButtons = document.querySelectorAll(".password-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
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
  });
}

// Password strength indicator
function setupPasswordStrength() {
  const passwordInput = document.getElementById("signupPassword");
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = this.value;
      const strengthBar = document.querySelector(".strength-fill");
      const strengthText = document.querySelector(".strength-text");

      if (!strengthBar || !strengthText) return;

      const strength = calculatePasswordStrength(password);

      // Update strength bar
      strengthBar.style.width = `${strength.percentage}%`;

      // Update strength text and color
      strengthText.textContent = strength.text;
      strengthBar.style.background = strength.color;
    });
  }
}

// Calculate password strength
function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = [];

  // Length check
  if (password.length >= 8) score += 25;
  else feedback.push("at least 8 characters");

  // Uppercase check
  if (/[A-Z]/.test(password)) score += 25;
  else feedback.push("uppercase letter");

  // Lowercase check
  if (/[a-z]/.test(password)) score += 25;
  else feedback.push("lowercase letter");

  // Number check
  if (/\d/.test(password)) score += 25;
  else feedback.push("number");

  // Special character bonus
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;

  let strength = {
    percentage: Math.min(score, 100),
    text: "",
    color: "",
  };

  if (score < 25) {
    strength.text = "Very Weak";
    strength.color = "#ff6b6b";
  } else if (score < 50) {
    strength.text = "Weak";
    strength.color = "#feca57";
  } else if (score < 75) {
    strength.text = "Good";
    strength.color = "#48dbfb";
  } else if (score < 100) {
    strength.text = "Strong";
    strength.color = "#1dd1a1";
  } else {
    strength.text = "Very Strong";
    strength.color = "#10ac84";
  }

  return strength;
}

// Validate password match
function validatePasswordMatch() {
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  if (password && confirmPassword) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match");
    } else {
      confirmPassword.setCustomValidity("");
    }
  }
}

// Google Authentication (simplified simulation)
function setupGoogleAuth() {
  const googleSignInBtn = document.getElementById("googleSignIn");
  const googleSignUpBtn = document.getElementById("googleSignUp");

  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", handleGoogleAuth);
  }

  if (googleSignUpBtn) {
    googleSignUpBtn.addEventListener("click", handleGoogleAuth);
  }
}

// Handle Google authentication
function handleGoogleAuth() {
  showLoadingOverlay("Connecting to Google...");

  // Simulate Google OAuth flow
  setTimeout(() => {
    hideLoadingOverlay();

    // Simulate successful Google auth
    const userData = {
      name: "Google User",
      email: "user@gmail.com",
      provider: "google",
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("herhorizon_user", JSON.stringify(userData));

    showAuthNotification(
      "Successfully signed in with Google! Redirecting...",
      "success"
    );

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }, 2000);
}

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
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

// Authentication notification system
function showAuthNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".auth-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `auth-notification auth-notification-${type}`;
  notification.innerHTML = `
        <div class="auth-notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
            <button class="auth-notification-close"><i class="fas fa-times"></i></button>
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
  const closeBtn = notification.querySelector(".auth-notification-close");
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
const authStyle = document.createElement("style");
authStyle.textContent = `
    .auth-notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .auth-notification-close {
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        margin-left: auto;
        color: inherit;
    }
    
    .auth-notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(authStyle);

// Check if user is already logged in
function checkAuthStatus() {
  const userData =
    localStorage.getItem("herhorizon_user") ||
    sessionStorage.getItem("herhorizon_user");

  if (userData) {
    // User is logged in, could redirect or show different content
    return JSON.parse(userData);
  }

  return null;
}

// Logout function (for future use)
function logout() {
  localStorage.removeItem("herhorizon_user");
  sessionStorage.removeItem("herhorizon_user");
  window.location.href = "login.html";
}

// Export functions for potential future use
window.HerHorizonAuth = {
  checkAuthStatus,
  logout,
  isValidEmail,
  isStrongPassword,
  showAuthNotification,
};
