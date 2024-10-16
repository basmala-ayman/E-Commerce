//check if user logging in
if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
}

// set username in navbar
let userName = document.getElementById('name');
userName.innerHTML = "Hello, " + JSON.parse(localStorage.getItem('user')).firstName;

// update cart amount
let cartIcon = document.getElementById('cart')
updateCartNo();

function updateCartNo() {
    productsCart = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    productsCart.forEach((item) => {
        total += item.quantity;
    })
    cartIcon.innerHTML = total || 0;
}

function logout() {
    let allUsers = JSON.parse(localStorage.getItem('allUsers'));
    let currentUser = JSON.parse(localStorage.getItem('user'));
    let allProducts = JSON.parse(localStorage.getItem('allProducts'));
    // products that user choice
    productsCart = JSON.parse(localStorage.getItem('cart'));
    allProducts.forEach((product) => {
        for (const item of productsCart) {
            if (product.id === item.id) {
                product.quantity = item.quantity;
                product.amount = item.amount;
            }
        }
    })
    // save user's order
    allUsers.forEach((user) => {
        if (user.email === currentUser.email) {
            user.order = productsCart;
        }
    })
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.href = 'login.html';
}