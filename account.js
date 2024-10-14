document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (username && email) {
        document.getElementById('usernameDisplay').textContent = username;
        document.getElementById('emailDisplay').textContent = email;
    } else {
        window.location.href = "register.html";
    }
});