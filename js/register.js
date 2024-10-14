class User {
    constructor(fName, lName, email, password, order) {
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
        this.order = order;
    }
}

let allUsers = [];
if (localStorage.getItem('allUsers')) {
    allUsers = JSON.parse(localStorage.getItem('allUsers'));
} else {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let fName = document.getElementById('firstName').value
    let lName = document.getElementById('lastName').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let rePassword = document.getElementById('rePassword').value
    let errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'none';
    let error = "";
    let pattern = /\S+@\S+\.\S+/;
    if (!pattern.test(email)) {
        error += `Invalid Email!!
        Please, try again.`;
    } else if (password.length < 6) {
        error += 'Password must be greater than 6 characters! ';
    } else if (password !== rePassword) {
        error += 'Passwords do not match! ';
    }
    if (error) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = "Error: " + error;
    } else {
        if (findEmail(email)) {
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = `Error: This Email is already Exist. Please, <a href="login.html" class="text-white">Log In now</a>`;
        } else {
            allUsers.push(new User(fName, lName, email, password));
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
            window.location.href = 'login.html';
        }
    }
})

function findEmail(email) {
    return allUsers.find(user => user.email === email);
}