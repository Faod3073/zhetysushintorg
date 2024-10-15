document.addEventListener('DOMContentLoaded', () => {
    const accountInfoElement = document.getElementById('account-info');

    // Send a GET request to the server to retrieve account information
    fetch('/account', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const accountInfo = `
            <p>Имя: ${data.username}</p>
            <p>Email: ${data.email}</p>
        `;
        accountInfoElement.innerHTML = accountInfo;
    })
    .catch(error => console.error(error));
});