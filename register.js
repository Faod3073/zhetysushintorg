function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        alert(`${username}, регистрация прошла успешно!`);
        window.location.href = "shintorg.html";  
    } else {
        alert("Регистрация не завершена. Пожалуйста, заполните все поля.");
    }
}