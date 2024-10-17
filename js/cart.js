// check if user logging in
if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
}

// set username in navbar
let userName = document.getElementById('name');
userName.innerHTML = "Hello, " + JSON.parse(localStorage.getItem('user')).firstName;

let productsCart = [];

if (localStorage.getItem('cart')) {
    productsCart = JSON.parse(localStorage.getItem('cart'));
}

let cartIcon = document.getElementById('cart');
updateCartNo();

let content = document.getElementById('content');

let totalPrice = document.getElementById('total');
calcTotal();

if (productsCart) {
    displayProducts();
}

function displayProducts() {
    content.innerHTML = '';
    for (const product of productsCart) {
        if (product.quantity !== 0) {
            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body" id="${product.id}">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Price per Item: </strong>${product.price} LE</p>
                <p class="card-text"><strong>Total Price: </strong>${product.price * product.quantity} LE</p>
                <div class="edit">
                    <button class="btn remove-one">-</button>
                    <span>${product.quantity}</span>
                    <button class="btn add-one">+</button>
                </div>
                <button class="btn btn-primary remove-all">Remove Product</button>
            </div>
            `
            if (product.amount === 0) {
                card.children[1].children[4].children[2].disabled = true;
            }
            content.appendChild(card);
        }
    }
}

let currentUser = JSON.parse(localStorage.getItem('user'))
content.addEventListener('click', function (e) {
    // add one item
    if (e.target.classList.contains('add-one')) {
        e.target.parentElement.children[0].disabled = false;
        let productID = e.target.parentElement.parentElement.id;
        productsCart.forEach((item) => {
            if (item.id === productID) {
                item.quantity++;
                let existProduct = item.activeQuantity.find(i => i.userEmail === currentUser.email);
                if (existProduct) {
                    existProduct.userQuantity = item.quantity;
                } else {
                    item.activeQuantity.push({ userEmail: currentUser.email, userQuantity: item.quantity });
                }
                item.amount--;
                e.target.parentElement.children[1].innerHTML = item.quantity;
                // set add button disabled when the amount of product equals zero
                if (item.amount === 0) {
                    e.target.disabled = true;
                } else {
                    e.target.disabled = false;
                }
            }
        });
    }
    // remove one item
    if (e.target.classList.contains('remove-one')) {
        e.target.parentElement.children[2].disabled = false;
        let productID = e.target.parentElement.parentElement.id;
        productsCart.forEach((item, index) => {
            if (item.id === productID) {
                item.quantity--;
                let existItem = item.activeQuantity.find(i => i.userEmail === currentUser.email);
                if (existItem) {
                    existItem.userQuantity = item.quantity;
                }
                item.amount++;
                e.target.parentElement.children[1].innerHTML = item.quantity;
                if (item.quantity === 0) {
                    productsCart.splice(index, 1);
                    displayProducts();
                } else {
                    e.target.disabled = false;
                }
            }
        });
    }

    updateCartNo();
    addToLocal();

    if (e.target.classList.contains('remove-all')) {
        let productID = e.target.parentElement.id;
        productsCart.forEach((item, index) => {
            if (item.id === productID) {
                item.amount += item.quantity;
                item.quantity = 0;
                let existItem = item.activeQuantity.find(i => i.userEmail === currentUser.email);
                if (existItem) {
                    existItem.userQuantity = item.quantity;
                }
                productsCart.splice(index, 1);
            }
        });
        updateCartNo();
        addToLocal();
        displayProducts();
    }
    // update total price value
    calcTotal();
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

function calcTotal() {
    let total = 0;
    productsCart.forEach((product) => {
        total += product.quantity * product.price;
    })
    totalPrice.innerHTML = `<strong>Total Price: </strong>${total} LE`;
}