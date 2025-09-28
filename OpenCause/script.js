console.log("Website is live!");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Signup button
document.getElementById("signup-btn").addEventListener("click", async () => {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  
  if (!name || !email || !password) {
    alert("Please fill all signup fields!");
    return;
  }

  const res = await signup(name, email, password);
  if (res && res.token) {
    alert("Signup successful!");
  } else {
    alert("Signup failed. Check console for errors.");
  }
});

// Login button
document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  
  if (!email || !password) {
    alert("Please fill all login fields!");
    return;
  }

  const res = await login(email, password);
  if (res && res.token) {
    alert("Login successful!");
    console.log("Token:", res.token); // you can store this in localStorage if needed
  } else {
    alert("Login failed. Check console for errors.");
  }
});
