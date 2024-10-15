document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const formResponse = document.getElementById('formResponse');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (username && email && password) {
            // Send a POST request to the server to register the user
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password })
            })
            .then(response => response.json())
            .then(data => {
                formResponse.textContent = `Регистрация прошла успешно, ${username}!`;
                registerForm.reset();
            })
            .catch(error => {
                console.error(error);
                formResponse.textContent = 'Произошла ошибка при регистрации. Попробуйте еще раз.';
            });
        } else {
            formResponse.textContent = 'Заполните все поля.';
        }
    });
});