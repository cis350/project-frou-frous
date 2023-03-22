import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../api/loginRegisterAPI';

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

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

  function displayRegister(res) {
    console.log(res);
    if (res.error) {
      toast.error(`Failed: ${res.err.message}`);
    } else {
      console.log(`register res: ${res}`);
      toast.success('registered!');
      window.location.href = '/';
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    const obj = {
      id, password, email, firstName, lastName,
    };
    if (isValidate()) {
      console.log(JSON.stringify(obj));
      createUser(obj, displayRegister);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
                        // id="firstName"
            placeholder="John"
          />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
                    // id="lastName"
            placeholder="John"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                    // id="email"
            placeholder="email"
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="username"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
        </label>
        <button type="submit">Sign Up</button>

      </form>
      <button type="button" className="link-button" onClick={() => navigate('/')}>Already have an Account? Sign in</button>

    </div>
  );
}

export default Register;