const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password
      })
    });
  
      if (response.ok) {
        window.location.replace('/dashboard')
      } else {
        const errorData = await response.json();
        console.error(errorData)
      }
    }
    
  
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);