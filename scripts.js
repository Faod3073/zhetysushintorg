// Функция для регистрации пользователя
function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        alert(`${username}, регистрация прошла успешно!`);
        window.location.href = "shintorg.html";  // Возвращаем пользователя на главную страницу после регистрации
    } else {
        alert("Регистрация не завершена. Пожалуйста, заполните все поля.");
    }
}

// Обратная связь
document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("yeSbghFVquT29L6sZ");  // Инициализация с вашим ключом

    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Отключаем стандартное поведение формы

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Отправляем данные через EmailJS
            emailjs.send("service_72wpt6c", "template_nxp0a5x", {
                name: name,
                email: email,
                message: message
            }).then(() => {
                formResponse.textContent = 'Спасибо, ' + name + '! Ваше сообщение отправлено.';
                contactForm.reset();  // Сбрасываем форму
            }).catch((error) => {
                console.log(error);  
                formResponse.textContent = 'Произошла ошибка при отправке сообщения. Попробуйте еще раз.';
            });
        } else {
            formResponse.textContent = 'Заполните все поля.';
        }
    });
});

// Товары
        const productsContainer = document.querySelector('.products-container');

        const productsData = [
            { id: 1, name: 'H818', price: 19300, quantity: 4 },
            { id: 2, name: 'I-1', price: 45200, quantity: 4 },
        ];

        // Render products
        productsData.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-item';
            productCard.dataset.name = product.name;
            productCard.innerHTML = `
                <img src="${product.name}.png" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} тг.</p>
                <p>Количество: ${product.quantity}</p>
                <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
            `;
            productsContainer.appendChild(productCard);
        });

        productsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = e.target.getAttribute('data-id');
                const product = productsData.find((product) => product.id === parseInt(productId));
                if (product) {
                    addProductToCart(product);
                }
            }
        });

        function addProductToCart(product) {
            let cartData = localStorage.getItem('cart');
            if (cartData === null) {
                cartData = [];
            } else {
                cartData = JSON.parse(cartData);
            }

            const existingProduct = cartData.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cartData.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cartData));

            window.location.href = 'cart.html';
        }
// Корзина
        const cartList = document.getElementById('cart-list');
        const totalPriceElement = document.getElementById('total-price');
        const checkoutButton = document.getElementById('checkout-button');

        let cartData = localStorage.getItem('cart');
        if (cartData === null) {
            cartData = [];
        } else {
            cartData = JSON.parse(cartData);
        }

        // Добавление в корзину
        cartData.forEach((item) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>Цена: ${item.price} тг.</span>
                <span>Количество: ${item.quantity}</span>
            `;
            cartList.appendChild(cartItem);
        });

        let totalPrice = 0;
        cartData.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        totalPriceElement.textContent = `Итого: ${totalPrice} тг.`;

        checkoutButton.addEventListener('click', () => {
            alert('Покупка завершена!');
        });

    // Функция для поиска продуктов
    document.getElementById('searchInput').addEventListener('input', searchProducts);

    function searchProducts() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const productItems = document.querySelectorAll('.product-item');

        productItems.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            if (productName.includes(input)) {
                product.style.display = 'block';  // Показать продукт, если имя совпадает с запросом
            } else {
                product.style.display = 'none';  // Скрыть продукт, если запрос не совпадает
            }
        });
    };
