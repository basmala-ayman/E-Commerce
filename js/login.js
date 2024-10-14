let allUsers = [];

if (localStorage.getItem('allUsers')) {
    allUsers = JSON.parse(localStorage.getItem('allUsers'));
}

let loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value
    let errorMsg = document.getElementById('errorMsg');
    errorMsg.style.display = 'none';
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
        let searchUser = checkInfo(email, password);
        if (searchUser == 1) {
            let currentUser = allUsers.find(user => user.email === email);
            if (currentUser.order) {
                localStorage.setItem('cart', JSON.stringify(currentUser.order))
            }
            localStorage.setItem('user', JSON.stringify(currentUser));
            window.location.href = 'home.html';
        } else if(searchUser==2) {
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = `Error: Your Password is not correct!! Please, try again.`;
        }else if(searchUser==-1){
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = `Error: This email is not exist!! Please, try again or <a href="register.html" class="text-white">Register now</a>`;
        }
    }
})

function checkInfo(email, password) {
    const user = allUsers.find(user => user.email === email);

    if (user) {
        return user.password === password ? 1 : 2; // Check password
    }

    return -1; // Email not found
}