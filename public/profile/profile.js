const API_URL = "http://localhost:4000/api/profile";

const token=localStorage.getItem("JWTToken");

// Axios config with headers
const axiosConfig = {
  headers: {
    Authorization: `${token}`,
  },
};

async function fetchProfile() {
  try {
    const response = await axios.get(API_URL,axiosConfig);
    if (response.data.success) {
      displayProfile(response.data.data);
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}


function displayProfile(profile) {
  document.getElementById("displayFullName").textContent = profile.name || "N/A";
  document.getElementById("displayEmail").textContent = profile.email || "N/A";
  document.getElementById("displayPhone").textContent = profile.linkedInUrl || "N/A";
  document.getElementById("displayCareerGoals").textContent = profile.careerGoals || "N/A";

  document.getElementById("profileDetails").classList.remove("hidden");
  document.getElementById("profileForm").classList.add("hidden");
  
  
}

// Prefill the form for editing
function prefillForm(profile) {
  document.getElementById("fullName").value = profile.name || "";
  document.getElementById("email").value = profile.email || "";
  document.getElementById("occupation").value = profile.occupation || "";
  document.getElementById("college").value = profile.college || "";
  document.getElementById("degree").value = profile.degree || "";
  document.getElementById("careerGoals").value = profile.careerGoals || "";
  document.getElementById("url").value = profile.linkedInUrl || "";
}

// Save or update the profile
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const profileData = Object.fromEntries(new FormData(e.target));
  try {
    const response = await axios.post(API_URL, profileData,axiosConfig);
    if (response.data.success) {
      fetchProfile();
    } else {
      console.error("Error saving profile:", response.data.message);
    }
  } catch (error) {
    console.error("Error saving profile:", error);
  }
});

// Edit Profile
document.getElementById("editProfileBtn").addEventListener("click", async () => {
  try {
    const response = await axios.get(API_URL,axiosConfig);
    if (response.data.success) {
      prefillForm(response.data.data);
      document.getElementById("profileDetails").classList.add("hidden");
      document.getElementById("profileForm").classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching profile for editing:", error);
  }
});

// Fetch the profile on page load
fetchProfile();
