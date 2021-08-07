const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

document
.querySelector('#login-form')
.addEventListener('submit', loginFormHandler);


  