const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Function to generate a random session token
function generateSessionToken() {
    return Math.random().toString(36).substring(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const hashPassword = window.btoa(password);
    const sessionToken = generateSessionToken();
    const loggedAt = new Date()
    if (password === '' || email === ''){
        alert('Please enter email and password');
    } else if(password === 'Admin@123' && email === 'admin@gmail.com') {
        sessionStorage.setItem('currentAdmin', JSON.stringify({ email: email, password: hashPassword, token: sessionToken, loggedAt: loggedAt }));
        // alert('Login successful');
        window.location.href = "./webPages/homePage.html";
    }else {
        alert("Incorrect username or password");
    }
});

