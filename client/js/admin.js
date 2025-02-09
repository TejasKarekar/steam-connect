document.addEventListener("DOMContentLoaded", () => {
    const adminLoginForm = document.getElementById("admin-login-form");
    const logoutBtn = document.getElementById("logout-btn");

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
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

    function checkAdminLogin() {
        if (!localStorage.getItem("adminLoggedIn")) {
            window.location.href = "admin-login.html";
        }
    }

    if (window.location.pathname.includes("admin-dashboard.html")) {
        checkAdminLogin();
    }

});