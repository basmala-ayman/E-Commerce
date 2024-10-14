// check if user logging in
if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
}

class Product {
    constructor(id, name, img, description, price, amount, quantity) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.description = description;
        this.price = price;
        this.amount = amount;
        this.quantity = 0;
    }
}

let myProducts = [];
myProducts.push(new Product('1', 'Bakery-1', './images/bakery-1.webp', 'Bakery', 35, 11))
myProducts.push(new Product('2', 'Bakery-2', './images/bakery-2.png', 'Bakery', 40, 0))
myProducts.push(new Product('3', 'Bakery-3', './images/bakery-3.png', 'Bakery', 105, 16))
myProducts.push(new Product('4', 'Bakery-4', './images/bakery-4.png', 'Bakery', 30, 2))
myProducts.push(new Product('5', 'Bakery-5', './images/bakery-5.png', 'Bakery', 35, 12))
myProducts.push(new Product('6', 'Bakery-6', './images/bakery-6.png', 'Bakery', 45, 11))
myProducts.push(new Product('7', 'Bakery-7', './images/bakery-7.png', 'Bakery', 35, 15))
myProducts.push(new Product('8', 'Bakery-8', './images/bakery-8.png', 'Bakery', 35, 1))
myProducts.push(new Product('9', 'Bakery-9', './images/bakery-9.png', 'Bakery', 50, 0))

let productsCart = [];

if (localStorage.getItem('cart')) {
    productsCart = JSON.parse(localStorage.getItem('cart'));
    myProducts.forEach((product) => {
        for (const item of productsCart) {
            if (product.id === item.id) {
                product.quantity = item.quantity;
                product.amount = item.amount;
            }
        }
    })
}

// set username in navbar
let userName = document.getElementById('name');
userName.innerHTML = "Hello, " + JSON.parse(localStorage.getItem('user')).email.split('@')[0];

let cartIcon = document.getElementById('cart');
updateCartNo();

let content = document.getElementById('content');

for (const product of myProducts) {
    let item = document.createElement('div')
    item.className = 'card';
    if (product.amount === 0) {
        item.innerHTML = `<div class="label bg-danger">Out of Stock</div>`
    } else if (product.amount <= 10) {
        item.innerHTML = `<div class="label bg-warning">Low In Stock</div>`
    } else {
        item.innerHTML = `<div class="label"></div>`
    }
    item.innerHTML += `
    <img src="${product.img}" class="card-img-top" alt="${product.name}">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text"><strong>Price: </strong>${product.price} LE</p>
        <button id="${product.id}" class="btn btn-primary">Add To Cart</button>
    </div>
    `
    content.appendChild(item);
    if (product.amount === 0) {
        document.getElementById(product.id).disabled=true
    }
}

content.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
        let card = e.target.parentElement.parentElement;
        let productID = e.target.id;
        let product = myProducts.find((item) => item.id === productID);
        // if this product is added for the first one
        if (!productsCart.find((item) => item.id === product.id)) {
            product.amount--;
            product.quantity++;
            productsCart.push(product);
        } else { // if this product is already in the cart
            productsCart.forEach((item) => {
                if (item.id === productID) {
                    item.amount--;
                    item.quantity++;
                    product.amount = item.amount;
                    product.quantity = item.quantity;
                }
            })
        }

        // update label
        if (product.amount === 0) {
            card.firstElementChild.innerHTML = "Out of Stock";
            card.firstElementChild.className = "label bg-danger";
            e.target.disabled = true;
        } else if (product.amount <= 10) {
            card.firstElementChild.innerHTML = "Low In Stock";
            card.firstElementChild.className = "label bg-warning";
        }

        updateCartNo();
        addToLocal();
    }
});

function addToLocal() {
    let items = JSON.stringify(productsCart);
    localStorage.setItem('cart', items);
}

function updateCartNo() {
    let total = 0;
    productsCart.forEach((item) => {
        total += item.quantity;
    })
    cartIcon.innerHTML = total;
}