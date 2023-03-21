import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Register = (props) => {
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
            errorMessage = errorMessage + 'firstName';
        }
        if (lastName === null || lastName === '') {
            isproceed = false;
            errorMessage = errorMessage + 'lastName';
        }
        if (email === null || email === '') {
            isproceed = false;
            errorMessage = errorMessage + 'email';
        }
        if (id === null || id === '') {
            isproceed = false;
            errorMessage = errorMessage + 'username';
        }
        if (password === null || password === '') {
            isproceed = false;
            errorMessage = errorMessage + 'password';
        }
        if (!isproceed) {
            toast.warning(errorMessage)
        } else {
            // if (/^[a-zA-Z0-9] + @[a-zA-Z0-9] + \.[A^Za-z]+$/.test(email)) {

            // } else {
            //     isproceed = false;
            //     toast.warning('Please enter a valid email');
            // }
        }
        return isproceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        let obj = {id, password, email, firstName, lastName};
        if (isValidate()) {
            console.log(JSON.stringify(obj));
            fetch("http://localhost:8000/user/", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(obj)
            }).then((res) => {
                console.log("register res: "+ res)
                toast.success('registered!')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed: ' + err.message);
            });

        }

    }


    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlfor="firstName">First Name</label>
                <input required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    //id="firstName"
                    placeholder="John"
                    //name="firstName"
                />
                <label htmlfor="lastName">Last Name</label>
                <input required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    //id="lastName"
                    placeholder="John"
                    //name="lastName"
                />
                <label htmlfor="email">Email</label>
                <input required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    //id="email"
                    placeholder="email"
                   // name="email"
                />
                <label htmlfor="username">Username</label>
                <input required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="username"
                    //id="username" name="username"
                />
                <label htmlfor="password">Password</label>
                <input required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    //id="password"
                    //name="password"
                    />
                <button type="submit">Sign Up</button>

            </form>
            <button className="link-button" onClick={() => navigate('/login')}>Already have an Account? Sign in</button>

        </div>
    )
}

