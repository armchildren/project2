const productsBtn = document.querySelectorAll('.product__btn'); // кнопка доб. в корзину
const cartProductsList = document.querySelector('.cart-content__list'); // list продукта
const basket = document.querySelector('.basket'); // корзинка
const cartQuantity = document.querySelector('.header-basket__quantity'); // счетчик корзинки
const fullPrice = document.querySelector('.fullprice'); // итоговая цена
let price = 0; // цена чтобы считать

// Это функция даёт рандомние id элементам 
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Это функция удаляет пробелы строки
const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

// Это фунция делает обратный вид priceWithoutSpaces
const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' );
};

// Суммирование
const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

// Это функция выводит сумму
const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} руб.`
}

const printQuantity = () => {
    let length = cartProductsList.querySelector('.simplebar-content').children.length; 
    cartQuantity.textContent = length;
    if(length > 0) {
        $('.basket__title').hover(function() {
        $('.bakset__cart').slideDown(400);
    }, function() {
        $('.bakset__cart').slideUp(400)
    });
    }
}

// Это функция удаляет элемент
const deleteProducts = (productParent) => {
    // 1. получить id
    let id = productParent.querySelector('.cart-product').dataset.id;
    // 2. disabled false
    document.querySelector(`.product-price[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
    // 3. minus price
    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent))
    minusFullPrice(currentPrice)
    // 4. print fullprice
    printFullPrice();
    // 5. remove productparent
    productParent.remove();
    // 6. count and print quantity
    printQuantity();
}

const generateCartProduct = (img, title, price, id) => {
    return `
    
    <li class="cart-content__item">
        <div class="cart-content__product cart-product" data-id = "${id}">
            <img src="${img}" alt="" class="cart-product__img">
            <div class="cart-product__text">
                <h3 class="cart-product__title">${title}</h3>
                    <span class="cart-product__price">${normalPrice(price)} руб.</span>
             </div>
            <button class="cart-product__delete"></button>
        </div>
    </li>
    `
};

productsBtn.forEach((item) => {

    item.closest('.product-price').setAttribute('data-id', randomId());
    item.addEventListener('click', (event) => {

        let self = event.currentTarget;
        const cart = event.target.closest('.product-price');

        const productInfo = {
            id: cart.dataset.id,
            img: cart.querySelector('.product__img').getAttribute('src'),
            title: cart.querySelector('.product__title').textContent,
            priceNumber: parseInt(priceWithoutSpaces(cart.querySelector('.product__price').textContent)),
        }

        plusFullPrice(productInfo.priceNumber);
        printFullPrice();
        cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(productInfo.img, productInfo.title, productInfo.priceNumber, productInfo.id));
        printQuantity();
        self.disabled = true;
    });

});

cartProductsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('cart-product__delete')) {
        deleteProducts(event.target.closest('.cart-content__item'));
    }
})


// Релизуем drag & drop