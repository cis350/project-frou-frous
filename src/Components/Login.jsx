import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validateLogin } from '../api/loginRegisterAPI';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  function displayLogin(resp) {
    if (resp.error) {
      toast.error(resp.error.message);
    } else if (Object.keys(resp).length === 0) {
      toast.error('Invalid username');
    } else if (resp.password === password) {
      toast.success('login successful');
      sessionStorage.setItem('username', username);
      window.location.href = '/user/:userId';
    } else {
      toast.error('Invalid password');
    }
  }

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('Please enter username');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('please enter password');
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      validateLogin(username, displayLogin);
      // console.log("LOGIN RSP", resp);
    }
  };

  return (
    <div className="auth-form-container">
      <h1 className="app-title">Frou Frous</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username" />
          Username

        </label>

        <label htmlFor="password">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
          Password
        </label>

        <button type="submit">Login</button>

      </form>

      <a href="/register">
        <button type="button" className="link-button">Register</button>
      </a>

      <button type="button" className="password-button">Forgot Password</button>

    </div>
  );
}

export default Login;
