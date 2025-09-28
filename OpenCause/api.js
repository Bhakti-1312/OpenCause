const API_URL = "http://localhost:5000"; // backend base URL

// ----------------- AUTH -----------------

// Signup function
async function signup(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    console.log("Signup response:", data);

    // Auto-login after signup
    if (data.user && data.token) {
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token);
      alert(`Welcome, ${data.user.name}!`);
    }

    return data;
  } catch (err) {
    console.error("Error signing up:", err);
    alert("Signup failed. Try again.");
  }
}

// Login function
async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log("Login response:", data);

    if (data.user && data.token) {
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token);
      alert(`Welcome, ${data.user.name}!`);
    }

    return data;
  } catch (err) {
    console.error("Error logging in:", err);
    alert("Login failed. Check your credentials.");
  }
}

// ----------------- NGO -----------------

// Get all NGOs
async function getNGOs() {
  try {
    const res = await fetch(`${API_URL}/api/ngos`);
    const data = await res.json();
    console.log("NGO list:", data);
    return data;
  } catch (err) {
    console.error("Error fetching NGOs:", err);
  }
}

// ----------------- DONATION -----------------

// Donate function
async function donate(userId, ngoId, amount) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ user: userId, ngo: ngoId, amount })
    });
    const data = await res.json();
    console.log("Donation response:", data);
    return data;
  } catch (err) {
    console.error("Error donating:", err);
  }
}

// ----------------- DONATION UI -----------------

const donationContainer = document.getElementById("donation-container");

// Display NGOs dynamically in donation section
async function displayNGODonations() {
  const ngos = await getNGOs();
  if (!donationContainer) return;

  donationContainer.innerHTML = "";

  ngos.forEach(ngo => {
    const card = document.createElement("div");
    card.className = "donation-card";
    card.innerHTML = `
      <h3>${ngo.name}</h3>
      <p>Focus: ${ngo.focus}</p>
      <p>Location: ${ngo.location}</p>
      <input type="number" placeholder="Enter amount (₹)" min="1" id="amount-${ngo._id}">
      <button onclick="donateUser('${ngo._id}')">Donate</button>
    `;
    donationContainer.appendChild(card);
  });
}

// Donate button handler
async function donateUser(ngoId) {
  const amountInput = document.getElementById(`amount-${ngoId}`);
  if (!amountInput) return;

  const amount = amountInput.value;
  if (!amount || amount <= 0) {
    alert("Enter a valid donation amount");
    return;
  }

  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("You must be logged in to donate!");
    return;
  }

  const res = await donate(userId, ngoId, amount);
  if (res && res.message) alert(res.message);
}

// Load donation cards on page load
displayNGODonations();

// Get the container element
const ngoContainer = document.getElementById("ngo-container");

// Display NGOs dynamically
async function displayNGOs() {
  const ngos = await getNGOs(); // fetch from backend
  ngoContainer.innerHTML = ""; // clear existing content

  ngos.forEach(ngo => {
    const card = document.createElement("div");
    card.className = "ngo-card"; // use your CSS class
    card.innerHTML = `
      <h3>${ngo.name}</h3>
      <p>Focus: ${ngo.focus}</p>
      <p>Location: ${ngo.location}</p>
      <p>Registration: ${ngo.registrationNumber}</p>
      <a href="${ngo.website}" target="_blank">Visit Website</a>
      <p>Email: ${ngo.contactEmail}</p>
      <p>Phone: ${ngo.contactPhone}</p>
    `;
    ngoContainer.appendChild(card);
  });
}

// Call this function when page loads
displayNGOs();
