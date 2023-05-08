import React from 'react';

function Register() {
  function handleSubmit() {
    // send email to forgot password
    return true;
  }

  return (
    <div className="auth-form-container">
      <form className="forgot-password-form" onSubmit={handleSubmit()}>
        <label htmlFor="email">
          Email
          {' '}
          <input placeholder="username" id="username" name="username" />
        </label>

        <button type="submit">Save Password</button>

      </form>
      <a href="/">
        <button type="button" className="link-button">Already have an Account? Sign in</button>
      </a>
    </div>
  );
}

export default Register;
