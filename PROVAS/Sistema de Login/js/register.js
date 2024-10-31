document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('register-error-message');

    // Checagem
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usernameExists = users.some(user => user.username === username);

    if (usernameExists) {
        errorMessage.textContent = 'Este nome de usuário já existe.';
        errorMessage.style.display = 'block';
    } else {
        // Salvamento de dados
        const user = { username, password };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        errorMessage.style.display = 'none';
        alert('Cadastro realizado com sucesso!');
        // Redireciona pra página de login
        window.location.href = 'Login.html';
    }
});
