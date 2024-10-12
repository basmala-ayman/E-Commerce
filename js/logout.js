//check if user logging in
if (!localStorage.getItem('email')) {
    window.location.href = 'login.html';
}

// set username in navbar
let userName = document.getElementById('name');
userName.innerHTML = "Hello, " + localStorage.getItem('email').split('@')[0];

// update cart amount
let cartIcon = document.getElementById('cart')
updateCartNo();

function updateCartNo() {
    productsCart = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    productsCart.forEach((item) => {
        total += item.quantity;
    })
    cartIcon.innerHTML = total;
}

function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('cart');
    window.location.href = 'login.html';
}