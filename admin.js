document.addEventListener("DOMContentLoaded", () => {
    const adminLoginForm = document.getElementById("admin-login-form");
    const logoutBtn = document.getElementById("logout-btn");

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            // Check credentials (replace with server-side authentication in production)
            if (username === "admin" && password === "password") {
                localStorage.setItem("adminLoggedIn", "true");
                window.location.href = "admin-dashboard.html";
            } else {
                document.getElementById("login-error").textContent = "Invalid credentials";
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("adminLoggedIn");
            window.location.href = "admin-login.html";
        });
    }

    // Check if user is logged in
    function checkAdminLogin() {
        if (!localStorage.getItem("adminLoggedIn")) {
            window.location.href = "admin-login.html";
        }
    }

    // Run this check on the admin dashboard page
    if (window.location.pathname.includes("admin-dashboard.html")) {
        checkAdminLogin();
    }

    // Add your existing admin dashboard functionality here
    // (e.g., view donors, approve donors, view patients, generate reports)
});