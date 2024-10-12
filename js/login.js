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
        errorMsg.innerHTML = "Error: " + error;
    } else {
        localStorage.setItem('email', email);
        window.location.href = 'home.html';
    }
})