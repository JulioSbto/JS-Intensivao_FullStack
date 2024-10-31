document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Check de usuarios
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificação
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        errorMessage.style.display = 'none';
        localStorage.setItem('currentUser', user.username);
        window.location.href = 'pagina1.html'; 
    } else {
        errorMessage.textContent = 'Nome de usuário ou senha incorretos.';
        errorMessage.style.display = 'block';
    }
});
