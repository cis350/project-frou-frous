import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validateLogin } from '../api/loginRegisterAPI';
import '../Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  async function displayLogin() {
    const resp = await validateLogin(username);
    if (resp.error) {
      toast.error(resp.error.message);
    } else if (Object.keys(resp).length === 0) {
      toast.error('Invalid username');
    } else if (resp.data[0].password === password) {
      toast.success('login successful');
      sessionStorage.setItem('username', username);
      window.location.href = `/app/user/${username}`;
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
      displayLogin();
    }
  };

  return (
    <div className="loginApp">
      <div className="auth-form-container">
        <h1 className="app-title"> ✨ Welcome to FrouFrous! ✨</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <input className="loginInput username" value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username" />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input className="loginInput password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
          </label>
          <button data-testid="submitButton" className="loginButton" type="submit">Login</button>

          <a href="/app/register">
            <button type="button" className="loginButton link-button">Register</button>
          </a>
        </form>

        {/* <button type="button" className="loginButton password-button">Forgot Password</button> */}

      </div>
    </div>
  );
}

export default Login;
