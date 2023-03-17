import React, { useState } from "react";
export const Register = (props) => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }


    return (
        <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlfor="name">Name</label>
            <input value={name} id="name" placeholder="John Doe" name="name"/>
            <label htmlfor="email">Email</label>
            <input value={email} id="email" placeholder="email" name="email"/>
            <label htmlfor="username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username"/>
            <label htmlfor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password"/>
            <button type="submit">Login</button>

        </form>
        <button className="link-button" onClick={()=>props.onFormSwitch('login')}>Already have an Account? Sign in</button>

    </div>
    )
}