//check if user logging in
if (localStorage.getItem('user')) {
    window.location.href = 'home.html';
} else {
    window.location.href = 'login.html';
}