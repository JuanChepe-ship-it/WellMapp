document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username === '') {
            alert('Please enter your username');
            return;
        }
        
        if (password === '') {
            alert('Please enter your password');
            return;
        }
        
        // Here you would typically send the login data to a server
        // For this example, we'll just show a success message
        alert('Login successful!');
    });
});
