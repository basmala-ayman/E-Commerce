class User {
    constructor(email, password, order) {
        this.email = email;
        this.password = password;
        this.order = order;
    }
}
let allUsers = [];
allUsers.push(new User('basmala.ayman@gmail.com', '123456'));
allUsers.push(new User('ayman.zaky@gmail.com', '123456'));

if (localStorage.getItem('allUsers')) {
    allUsers = JSON.parse(localStorage.getItem('allUsers'));
} else {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}


let loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let errorMsg = document.getElementById('errorMsg');
    let error = "";
    let pattern = /\S+@\S+\.\S+/;
    if (!email) {
        error += 'Email is required! ';
    } else if (!pattern.test(email)) {
        error += `Invalid Email!!
        Please, try again.`;
    } else if (!password) {
        error += 'Password is required! ';
    }
    if (error) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = "Error: " + error;
    } else {
        let currentUser = checkInfo(email, password);
        if (currentUser) {
            if (currentUser.order) {
                localStorage.setItem('cart', JSON.stringify(currentUser.order))
            }
            localStorage.setItem('user', JSON.stringify(currentUser));
            window.location.href = 'home.html';
        } else {
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = `Error: Your Email or Password is incorrect!! Please, try again.`;
        }
    }
})

function checkInfo(email, password) {
    return allUsers.find(user => user.email === email && user.password === password);
}