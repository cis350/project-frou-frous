import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../api/loginRegisterAPI';

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [friends] = useState([]);
  const [friendReqs] = useState([]);

  const isValidate = () => {
    let isproceed = true;
    let errorMessage = 'Please enter value: ';
    if (firstName === null || firstName === '') {
      isproceed = false;
      errorMessage += 'firstName';
    }
    if (lastName === null || lastName === '') {
      isproceed = false;
      errorMessage += 'lastName';
    }
    if (email === null || email === '') {
      isproceed = false;
      errorMessage += 'email';
    }
    if (id === null || id === '') {
      isproceed = false;
      errorMessage += 'username';
    }
    if (password === null || password === '') {
      isproceed = false;
      errorMessage += 'password';
    }
    if (!isproceed) {
      toast.warning(errorMessage);
    } else {
      // if (/^[a-zA-Z0-9] + @[a-zA-Z0-9] + \.[A^Za-z]+$/.test(email)) {

      // } else {
      //     isproceed = false;
      //     toast.warning('Please enter a valid email');
      // }
    }
    return isproceed;
  };

  async function displayRegister(obj) {
    const res = await createUser(obj);
    console.log('RES', res);
    if (res.error) {
      toast.error(`Failed: ${res.err.message}`);
    } else {
      toast.success('registered!');
      window.location.href = '/';
    }
  }

  const handleSubmit = (e) => {
    debugger; // eslint-disable-line 
    e.preventDefault();
    const obj = {
      id, password, email, firstName, lastName, friends, friendReqs,
    };
    if (isValidate()) {
      displayRegister(obj);
    }
  };

  return (
    <div className="loginApp">
      <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="fieldlabel">
            First Name
            <input
              className="loginInput"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
                        // id="firstName"
              placeholder="John"
            />
          </label>
          <label htmlFor="lastName" className="fieldlabel">
            Last Name
            <input
              className="loginInput"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
                    // id="lastName"
              placeholder="Doe"
            />
          </label>
          <label htmlFor="email" className="fieldlabel">
            Email
            <input
              className="loginInput"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                    // id="email"
              placeholder="email"
            />
          </label>
          <br />
          <label htmlFor="username" className="fieldlabel">
            Username
            <input
              className="loginInput"
              name="username1"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="username"
            />
          </label>
          <label htmlFor="password" className="fieldlabel">
            Password
            <input
              className="loginInput password"
              name="password1"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </label>
          <br />
          <button data-testid="submitButton" className="loginButton" type="submit">Sign Up</button>
          <a href="/">
            <button data-testid="login" type="button" className="loginButton link-button">Have an Account? Sign in</button>
        </a>
        </form>
        

      </div>
    </div>
  );
}

export default Register;
