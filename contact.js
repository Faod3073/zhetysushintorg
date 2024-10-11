document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("yeSbghFVquT29L6sZ");  

    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();  

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            emailjs.send("service_72wpt6c", "template_nxp0a5x", {
                name: name,
                email: email,
                message: message
            }).then(() => {
                formResponse.textContent = 'Спасибо, ' + name + '! Ваше сообщение отправлено.';
                contactForm.reset();
            }).catch((error) => {
                console.log(error); 
                formResponse.textContent = 'Произошла ошибка при отправке сообщения. Попробуйте еще раз.';
            });
        } else {
            formResponse.textContent = 'Заполните все поля.';
        }
    });
});