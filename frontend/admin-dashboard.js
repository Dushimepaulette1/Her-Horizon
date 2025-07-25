document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLoggedIn()) {
    window.location.href = "admin-login.html";
    return;
  }

  initializeAdminDashboard();
});

// Initialize admin dashboard
function initializeAdminDashboard() {
  loadOpportunitiesData();
  updateDashboardStats();
  setupAdminEventListeners();
  populateOpportunitiesTable();
}

// Load opportunities data from localStorage or use default
function loadOpportunitiesData() {
  const savedData = localStorage.getItem("herhorizon_opportunities");
  if (savedData) {
    try {
      window.adminOpportunities = JSON.parse(savedData);
    } catch (e) {
      window.adminOpportunities = getDefaultOpportunities();
    }
  } else {
    window.adminOpportunities = getDefaultOpportunities();
    saveOpportunitiesData();
  }
}

// Get default opportunities data
function getDefaultOpportunities() {
  return [
    {
      id: 1,
      title: "MasterCard Foundation Scholars Program",
      category: "Education",
      description:
        "Full scholarship program for academically talented yet economically disadvantaged young people from Africa to pursue undergraduate and graduate studies at leading universities worldwide.",
      deadline: "March 15, 2024",
      applyUrl: "https://mastercardfdn.org/scholars/",
    },
    {
      id: 2,
      title: "Google Women Techmakers Program",
      category: "Skills",
      description:
        "A program that provides visibility, community, and resources for women in technology to drive innovation and participation in the field through workshops, mentorship, and networking.",
      deadline: "April 30, 2024",
      applyUrl: "https://developers.google.com/womentechmakers",
    },
    {
      id: 3,
      title: "UN Women Rwanda Internship",
      category: "Career",
      description:
        "Internship opportunity with UN Women Rwanda to support gender equality and women's empowerment initiatives in the country. Gain hands-on experience in development work.",
      deadline: "February 28, 2024",
      applyUrl: "https://www.unwomen.org/en/about-us/employment",
    },
    {
      id: 4,
      title: "She Code Africa Mentorship Program",
      category: "Mentorship",
      description:
        "A mentorship program connecting young African women with experienced professionals in technology and entrepreneurship. Includes career guidance and skill development.",
      deadline: "May 20, 2024",
      applyUrl: "https://shecodeafrica.org/mentorship",
    },
    {
      id: 5,
      title: "YALI Regional Leadership Center",
      category: "Skills",
      description:
        "Leadership development program for young African leaders focusing on business, civic leadership, and public management. Includes networking opportunities and practical training.",
      deadline: "June 10, 2024",
      applyUrl: "https://yali.state.gov/rlc/",
    },
  ];
}

// Save opportunities data to localStorage
function saveOpportunitiesData() {
  localStorage.setItem(
    "herhorizon_opportunities",
    JSON.stringify(window.adminOpportunities)
  );

  // Also update the main site's data
  if (window.HerHorizonApp) {
    window.HerHorizonApp.opportunitiesData = [...window.adminOpportunities];
  }
}

// Set up admin event listeners
function setupAdminEventListeners() {
  // Logout button
  document.getElementById("adminLogout").addEventListener("click", adminLogout);

  // Add opportunity button
  document
    .getElementById("addOpportunityBtn")
    .addEventListener("click", openAddOpportunityModal);

  // Modal close buttons
  document
    .getElementById("closeModal")
    .addEventListener("click", closeOpportunityModal);
  document
    .getElementById("cancelBtn")
    .addEventListener("click", closeOpportunityModal);

  // Delete modal buttons
  document
    .getElementById("cancelDelete")
    .addEventListener("click", closeDeleteModal);
  document
    .getElementById("confirmDelete")
    .addEventListener("click", confirmDeleteOpportunity);

  // Opportunity form
  document
    .getElementById("opportunityForm")
    .addEventListener("submit", handleOpportunitySubmit);

  // Search and filter
  document
    .getElementById("adminSearchInput")
    .addEventListener("input", filterOpportunitiesTable);
  document
    .getElementById("adminCategoryFilter")
    .addEventListener("change", filterOpportunitiesTable);

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    const opportunityModal = document.getElementById("opportunityModal");
    const deleteModal = document.getElementById("deleteModal");

    if (e.target === opportunityModal) {
      closeOpportunityModal();
    }
    if (e.target === deleteModal) {
      closeDeleteModal();
    }
  });
}

// Update dashboard statistics
function updateDashboardStats() {
  const opportunities = window.adminOpportunities;

  document.getElementById("totalOpportunities").textContent =
    opportunities.length;
  document.getElementById("educationCount").textContent = opportunities.filter(
    (o) => o.category === "Education"
  ).length;
  document.getElementById("careerCount").textContent = opportunities.filter(
    (o) => o.category === "Career"
  ).length;
  document.getElementById("skillsCount").textContent = opportunities.filter(
    (o) => o.category === "Skills"
  ).length;
}

// Populate opportunities table
function populateOpportunitiesTable(opportunitiesToShow = null) {
  const opportunities = opportunitiesToShow || window.adminOpportunities;
  const tableBody = document.getElementById("opportunitiesTableBody");

  if (opportunities.length === 0) {
    tableBody.innerHTML = `
              <tr>
                  <td colspan="5" style="text-align: center; padding: 2rem; color: #666;">
                      No opportunities found
                  </td>
              </tr>
          `;
    return;
  }

  tableBody.innerHTML = opportunities
    .map(
      (opportunity) => `
          <tr>
              <td>${opportunity.id}</td>
              <td>
                  <div style="max-width: 300px;">
                      <strong>${opportunity.title}</strong>
                      <div style="font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                          ${opportunity.description.substring(0, 100)}${
        opportunity.description.length > 100 ? "..." : ""
      }
                      </div>
                  </div>
              </td>
              <td>
                  <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.8rem;">
                      ${opportunity.category}
                  </span>
              </td>
              <td>${opportunity.deadline}</td>
              <td>
                  <div class="action-buttons">
                      <button class="edit-btn" onclick="editOpportunity(${
                        opportunity.id
                      })">
                          <i class="fas fa-edit"></i> Edit
                      </button>
                      <button class="delete-btn" onclick="deleteOpportunity(${
                        opportunity.id
                      })">
                          <i class="fas fa-trash"></i> Delete
                      </button>
                  </div>
              </td>
          </tr>
      `
    )
    .join("");
}

// Filter opportunities table
function filterOpportunitiesTable() {
  const searchTerm = document
    .getElementById("adminSearchInput")
    .value.toLowerCase();
  const categoryFilter = document.getElementById("adminCategoryFilter").value;

  const filteredOpportunities = window.adminOpportunities.filter(
    (opportunity) => {
      const matchesSearch =
        searchTerm === "" ||
        opportunity.title.toLowerCase().includes(searchTerm) ||
        opportunity.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        categoryFilter === "all" || opportunity.category === categoryFilter;

      return matchesSearch && matchesCategory;
    }
  );

  populateOpportunitiesTable(filteredOpportunities);
}

// Open add opportunity modal
function openAddOpportunityModal() {
  document.getElementById("modalTitle").textContent = "Add New Opportunity";
  document.getElementById("opportunityForm").reset();
  document.getElementById("opportunityId").value = "";
  document.getElementById("saveBtn").innerHTML =
    '<i class="fas fa-save"></i> Save Opportunity';
  document.getElementById("opportunityModal").style.display = "block";
}

// Open edit opportunity modal
function editOpportunity(id) {
  const opportunity = window.adminOpportunities.find((o) => o.id === id);
  if (!opportunity) return;

  document.getElementById("modalTitle").textContent = "Edit Opportunity";
  document.getElementById("opportunityId").value = opportunity.id;
  document.getElementById("opportunityTitle").value = opportunity.title;
  document.getElementById("opportunityCategory").value = opportunity.category;
  document.getElementById("opportunityDescription").value =
    opportunity.description;
  document.getElementById("opportunityDeadline").value = opportunity.deadline;
  document.getElementById("opportunityUrl").value = opportunity.applyUrl;
  document.getElementById("saveBtn").innerHTML =
    '<i class="fas fa-save"></i> Update Opportunity';
  document.getElementById("opportunityModal").style.display = "block";
}

// Close opportunity modal
function closeOpportunityModal() {
  document.getElementById("opportunityModal").style.display = "none";
}

// Handle opportunity form submission
function handleOpportunitySubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const opportunityId = document.getElementById("opportunityId").value;

  const opportunityData = {
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    deadline: formData.get("deadline"),
    applyUrl: formData.get("applyUrl"),
  };

  // Validation
  if (
    !opportunityData.title ||
    !opportunityData.category ||
    !opportunityData.description ||
    !opportunityData.deadline ||
    !opportunityData.applyUrl
  ) {
    showAdminNotification("Please fill in all required fields.", "error");
    return;
  }

  if (opportunityId) {
    // Update existing opportunity
    const index = window.adminOpportunities.findIndex(
      (o) => o.id === Number.parseInt(opportunityId)
    );
    if (index !== -1) {
      window.adminOpportunities[index] = {
        ...window.adminOpportunities[index],
        ...opportunityData,
      };
      showAdminNotification("Opportunity updated successfully!", "success");
    }
  } else {
    // Add new opportunity
    const newId =
      Math.max(...window.adminOpportunities.map((o) => o.id), 0) + 1;
    window.adminOpportunities.push({
      id: newId,
      ...opportunityData,
    });
    showAdminNotification("Opportunity added successfully!", "success");
  }

  saveOpportunitiesData();
  updateDashboardStats();
  populateOpportunitiesTable();
  filterOpportunitiesTable();
  closeOpportunityModal();
}

// Delete opportunity
function deleteOpportunity(id) {
  window.opportunityToDelete = id;
  document.getElementById("deleteModal").style.display = "block";
}

// Close delete modal
function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
  window.opportunityToDelete = null;
}

// Confirm delete opportunity
function confirmDeleteOpportunity() {
  if (window.opportunityToDelete) {
    const index = window.adminOpportunities.findIndex(
      (o) => o.id === window.opportunityToDelete
    );
    if (index !== -1) {
      window.adminOpportunities.splice(index, 1);
      saveOpportunitiesData();
      updateDashboardStats();
      populateOpportunitiesTable();
      filterOpportunitiesTable();
      showAdminNotification("Opportunity deleted successfully!", "success");
    }
  }
  closeDeleteModal();
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
const adminDashboardStyle = document.createElement("style");
adminDashboardStyle.textContent = `
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
document.head.appendChild(adminDashboardStyle);

// Make functions globally available
window.editOpportunity = editOpportunity;
window.deleteOpportunity = deleteOpportunity;
