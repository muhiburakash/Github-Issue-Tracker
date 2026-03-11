document.getElementById('sign-in-btn').addEventListener('click', function () {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;
  const passwordInput = document.getElementById('password-input');
  const password = passwordInput.value;
  if (username == 'admin' && password == 'admin123'
  ) {
    alert('Login Success')
    window.location.assign("./home.html")
  } else {
    alert('login Faild')
  }
})

