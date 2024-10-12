//check if user logging in
if (localStorage.getItem('email')) {
    window.location.href = 'home.html';
} else {
    window.location.href = 'login.html';
}