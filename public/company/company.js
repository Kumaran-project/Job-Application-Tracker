const companyTable = document.getElementById("companyTable").getElementsByTagName("tbody")[0];
const companyFormContainer = document.getElementById("companyFormContainer");
const companyForm = document.getElementById("companyForm");
const cancelBtn = document.getElementById("cancelBtn");
const addCompanyBtn = document.getElementById("addCompanyBtn");
const searchInput = document.getElementById("search");

 
const API_URL = "http://localhost:4000/api/companies"; // Update with your backend URL

document.addEventListener("DOMContentLoaded", fetchcompanies);

async function fetchcompanies() {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log(response.data);
    if (response.data) {
      renderCompanyTable(response.data);
    }
  } catch (error) {
    console.error("Error fetching companys:", error);
  }
}

function renderCompanyTable(Companies){
  companyTable.innerHTML = Companies.map(company => `
    <tr>
      <td>${company.name}</td>
      <td>${company.industry}</td>
      <td>${company.location}</td>
      <td>${company.size}</td>
      <td>${company.type}</td>
      <td>
        <button class="action-btn edit" data-id="${company.id}">Edit</button>
        <button class="action-btn delete" data-id="${company.id}">Delete</button>
      </td>
    </tr>
  `).join("");

  attachActionListeners();
}

function attachActionListeners() {
  document.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", handleEditCompany);
  });

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", handleDeleteCompany);
  });
}

addCompanyBtn.addEventListener("click", () => {
  showForm();
  resetForm();
  companyForm.dataset.editing = false;
});

function showForm() {
  companyFormContainer.classList.remove("hidden");
}

function resetForm() {
  companyForm.reset();
  delete companyForm.dataset.editing;
  delete companyForm.dataset.companyId;
}

cancelBtn.addEventListener("click", hideForm);

function hideForm() {
  companyFormContainer.classList.add("hidden");
  resetForm();
}

companyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const companyData = Object.fromEntries(new FormData(companyForm));

  try {
    if (companyForm.dataset.editing === "true") {
      await axios.put(`${API_URL}/${companyForm.dataset.companyId}`, companyData);
    } else {
      await axios.post(API_URL, companyData);
    }
    hideForm();
    fetchcompanies();
  } catch (error) {
    console.error("Error saving company:", error);
  }
});

async function handleEditCompany(e) {
  const companyId = e.target.dataset.id;
  try {
    const response = await axios.get(`${API_URL}/${companyId}`);
    const company = response.data;

    prefillForm(company);
    companyForm.dataset.editing = true;
    companyForm.dataset.companyId = companyId;
    showForm();
  } catch (error) {
    console.error("Error fetching company details:", error);
  }
}

async function handleDeleteCompany(e) {
  const companyId = e.target.dataset.id;
  try {
    await axios.delete(`${API_URL}/${companyId}`);
    fetchcompanies();
  } catch (error) {
    console.error("Error deleting company:", error);
  }
}

function prefillForm(company) {
  Object.keys(company).forEach(key => {
    const input = companyForm.elements[key];
    if (input) input.value = company[key];
  });
}
