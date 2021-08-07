const registerFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#register-username').value.trim();
    const password = document.querySelector('#register-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        });
    } else {
        alert("Please fill out all fields.");
    }
};

document
.querySelector('#register-form')
.addEventListener('submit', registerFormHandler);