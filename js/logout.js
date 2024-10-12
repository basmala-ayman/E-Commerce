//check if user logging in
if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
}

// set username in navbar
let userName = document.getElementById('name');
userName.innerHTML = "Hello, " + JSON.parse(localStorage.getItem('user')).email.split('@')[0];

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
    allUsers.forEach((user) => {
        if (user.email === currentUser.email) {
            user.order = JSON.parse(localStorage.getItem('cart'));
        }
    })
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.href = 'login.html';
}