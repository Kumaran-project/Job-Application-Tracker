const jobTableBody = document.getElementById("jobTableBody");
const addJobBtn = document.getElementById("addJobBtn");
const jobFormContainer = document.getElementById("jobFormContainer");
const jobForm = document.getElementById("jobForm");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("search");

const API_URL = "http://localhost:4000/api/jobs"; 
const token=localStorage.getItem("JWTToken");

document.addEventListener("DOMContentLoaded", fetchJobs);

async function fetchJobs() {
  try {
    const response = await axios.get(`${API_URL}`,{headers: {
      Authorization: `${token}`,
    }});
    if (response.data.success) {
      renderJobTable(response.data.data);
      updateDashboard(response.data.data)
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

function updateDashboard(jobs) {
  const statusCounts = {
    Pending: 0,
    Applied: 0,
    Interviewed: 0,
    Rejected: 0,
    Accepted: 0,
  };
  jobs.forEach(job => {
    if (statusCounts[job.jobStatus] !== undefined) {
      statusCounts[job.jobStatus]++;
    }
  });

  document.querySelector('.status:nth-child(1) h3').textContent = `Pending (${statusCounts.Pending})`;
  document.querySelector('.status:nth-child(2) h3').textContent = `Applied (${statusCounts.Applied})`;
  document.querySelector('.status:nth-child(3) h3').textContent = `Interviewed (${statusCounts.Interviewed})`;
  document.querySelector('.status:nth-child(4) h3').textContent = `Rejected (${statusCounts.Rejected})`;
  document.querySelector('.status:nth-child(5) h3').textContent = `Accepted (${statusCounts.Accepted})`;
}

function renderJobTable(jobs) {
  jobTableBody.innerHTML = jobs
    .map(
      (job) => `
    <tr>
      <td>${job.jobTitle}</td>
      <td>${job.company}</td>
      <td>${job.jobSalary}</td>
      <td>${job.jobLocation}</td>
      <td>${job.jobStatus}</td>
      <td>${job.appliedDate}</td>
      <td>${job.followUp}</td>
      <td>
        <a href="${job.resumeUrl}" target="_blank">Download Resume</a> |
        <a href="${job.coverLetterUrl}" target="_blank">Download Cover Letter</a>
      </td>
      <td>
        <button class="action-btn edit" data-id="${job.id}">Edit</button>
        <button class="action-btn delete" data-id="${job.id}">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
  attachActionListeners();
}


searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase(); 
  filterJobs(searchTerm);
});

function filterJobs(searchTerm) {
  const rows = jobTableBody.querySelectorAll("tr");
  rows.forEach((row) => {
    const jobTitle = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
    const company = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const jobLocation = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
    
    // Show the row if it matches the search term in any relevant field
    if (
      jobTitle.includes(searchTerm) ||
      company.includes(searchTerm) ||
      jobLocation.includes(searchTerm)
    ) {
      row.style.display = ""; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  });
}
function attachActionListeners() {
  document.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", handleEditJob);
  });

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", handleDeleteJob);
  });
}

addJobBtn.addEventListener("click", () => {
  showForm();
  resetForm();
  jobForm.dataset.editing = false;
});

function showForm() {
  jobFormContainer.classList.remove("hidden");
}

function resetForm() {
  jobForm.reset();
  delete jobForm.dataset.editing;
  delete jobForm.dataset.jobId;
}

cancelBtn.addEventListener("click", hideForm);

function hideForm() {
  jobFormContainer.classList.add("hidden");
  resetForm();
}

jobForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(jobForm); // Collect all form data, including files

  try {
    if (jobForm.dataset.editing === "true") {
      await axios.put(`${API_URL}/${jobForm.dataset.jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data",Authorization: `${token}` },
      });
    } else {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" ,Authorization: `${token}`},
      });
    }
    hideForm();
    fetchJobs();
  } catch (error) {
    console.error("Error saving job:", error);
  }
});



async function handleEditJob(e) {
  const jobId = e.target.dataset.id;
  try {
    const response = await axios.get(`${API_URL}/${jobId}`,{Headers:{Authorization: `${token}`}});
    const job = response.data.data;

    prefillForm(job);
    jobForm.dataset.editing = true;
    jobForm.dataset.jobId = jobId;
    showForm();
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
}

async function handleDeleteJob(e) {
  const jobId = e.target.dataset.id;
  try {
    await axios.delete(`${API_URL}/${jobId}`);
    fetchJobs();
  } catch (error) {
    console.error("Error deleting job:", error);
  }
}

function prefillForm(job) {
  Object.keys(job).forEach(key => {
    const input = jobForm.elements[key];
    if (input) input.value = job[key];
  });
}
