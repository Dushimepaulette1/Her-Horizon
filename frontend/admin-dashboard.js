document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLoggedIn()) {
    window.location.href = "admin-login.html";
    return;
  }

  initializeAdminDashboard();
});

let adminOpportunities = [];

function initializeAdminDashboard() {
  fetchOpportunities();
  setupAdminEventListeners();
}

async function fetchOpportunities() {
  try {
    const response = await fetch("http://localhost:5000/api/opportunities");
    const data = await response.json();
    adminOpportunities = data;
    updateDashboardStats();
    populateOpportunitiesTable();
  } catch (error) {
    showAdminNotification("Failed to load opportunities", "error");
  }
}

function updateDashboardStats() {
  document.getElementById("totalOpportunities").textContent =
    adminOpportunities.length;
  document.getElementById("educationCount").textContent =
    adminOpportunities.filter((o) => o.category === "Education").length;
  document.getElementById("careerCount").textContent =
    adminOpportunities.filter((o) => o.category === "Career").length;
  document.getElementById("skillsCount").textContent =
    adminOpportunities.filter((o) => o.category === "Skills").length;
}

function populateOpportunitiesTable(opps = adminOpportunities) {
  const tableBody = document.getElementById("opportunitiesTableBody");
  if (opps.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No opportunities found</td></tr>`;
    return;
  }

  tableBody.innerHTML = opps
    .map(
      (opp) => `
    <tr>
      <td>${opp._id}</td>
      <td>${opp.title}</td>
      <td>${opp.category}</td>
      <td>${opp.date ? new Date(opp.date).toLocaleDateString() : "N/A"}</td>
      <td class="flex gap-2">
        <button
          onclick="editOpportunity('${opp._id}')"
           class="btn-edit"
        >
          Edit
        </button>
        <button
          onclick="deleteOpportunity('${opp._id}')"
           class="btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  `
    )
    .join("");
}

function openAddOpportunityModal() {
  document.getElementById("modalTitle").textContent = "Add New Opportunity";
  document.getElementById("opportunityForm").reset();
  document.getElementById("opportunityId").value = "";
  document.getElementById("opportunityModal").style.display = "block";
}

function closeOpportunityModal() {
  document.getElementById("opportunityModal").style.display = "none";
}

function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
}

function setupAdminEventListeners() {
  document
    .getElementById("addOpportunityBtn")
    .addEventListener("click", openAddOpportunityModal);
  document
    .getElementById("opportunityForm")
    .addEventListener("submit", handleOpportunitySubmit);
  document.getElementById("adminLogout").addEventListener("click", adminLogout);
  document
    .getElementById("cancelBtn")
    .addEventListener("click", closeOpportunityModal);
  document
    .getElementById("cancelDelete")
    .addEventListener("click", closeDeleteModal);
  document
    .getElementById("confirmDelete")
    .addEventListener("click", confirmDeleteOpportunity);

  document
    .getElementById("adminSearchInput")
    .addEventListener("input", filterOpportunitiesTable);
  document
    .getElementById("adminCategoryFilter")
    .addEventListener("change", filterOpportunitiesTable);
}

function isAdminLoggedIn() {
  // Expects admin data stored as JSON string including token
  const adminData = localStorage.getItem("herhorizon_admin");
  if (!adminData) return false;
  try {
    const admin = JSON.parse(adminData);
    return admin.role === "admin" && !!admin.token;
  } catch {
    return false;
  }
}

function adminLogout() {
  localStorage.removeItem("herhorizon_admin");
  window.location.href = "admin-login.html";
}

function showAdminNotification(message, type = "info") {
  alert(`${type.toUpperCase()}: ${message}`);
}

function editOpportunity(id) {
  const opp = adminOpportunities.find((o) => o._id === id);
  if (!opp) return;

  document.getElementById("modalTitle").textContent = "Edit Opportunity";
  document.getElementById("opportunityId").value = opp._id;
  document.getElementById("opportunityTitle").value = opp.title;
  document.getElementById("opportunityCategory").value = opp.category;
  document.getElementById("opportunityDescription").value = opp.description;
  document.getElementById("opportunityDeadline").value =
    opp.date?.split("T")[0] || "";
  document.getElementById("opportunityUrl").value = opp.link;
  document.getElementById("opportunityModal").style.display = "block";
}

async function handleOpportunitySubmit(e) {
  e.preventDefault();

  const id = document.getElementById("opportunityId").value;
  const adminData = JSON.parse(
    localStorage.getItem("herhorizon_admin") || "{}"
  );
  const token = adminData.token || "";

  const data = {
    title: document.getElementById("opportunityTitle").value,
    category: document.getElementById("opportunityCategory").value,
    description: document.getElementById("opportunityDescription").value,
    date: document.getElementById("opportunityDeadline").value,
    link: document.getElementById("opportunityUrl").value,
  };

  try {
    const url = id
      ? `http://localhost:5000/api/opportunities/${id}`
      : "http://localhost:5000/api/opportunities";
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to save opportunity");

    showAdminNotification(
      id ? "Updated successfully!" : "Created successfully!",
      "success"
    );
    closeOpportunityModal();
    fetchOpportunities();
  } catch (err) {
    showAdminNotification("Error saving opportunity", "error");
  }
}

let currentDeleteId = null;

function deleteOpportunity(id) {
  currentDeleteId = id;
  document.getElementById("deleteModal").style.display = "block";
}

async function confirmDeleteOpportunity() {
  if (!currentDeleteId) return;

  const adminData = JSON.parse(
    localStorage.getItem("herhorizon_admin") || "{}"
  );
  const token = adminData.token || "";

  try {
    const res = await fetch(
      `http://localhost:5000/api/opportunities/${currentDeleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Delete failed");

    showAdminNotification("Deleted successfully", "success");
    closeDeleteModal();
    fetchOpportunities();
  } catch (err) {
    showAdminNotification("Failed to delete", "error");
  }
}

function filterOpportunitiesTable() {
  const search = document
    .getElementById("adminSearchInput")
    .value.toLowerCase();
  const category = document.getElementById("adminCategoryFilter").value;

  const filtered = adminOpportunities.filter((opp) => {
    const matchSearch =
      opp.title.toLowerCase().includes(search) ||
      opp.description.toLowerCase().includes(search);
    const matchCategory = category === "all" || opp.category === category;
    return matchSearch && matchCategory;
  });

  populateOpportunitiesTable(filtered);
}

// Make global for HTML inline handlers
window.editOpportunity = editOpportunity;
window.deleteOpportunity = deleteOpportunity;
