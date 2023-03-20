//import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = (props) => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        if(validate()){
            console.log('success');
            fetch("http://localhost:3000/user"+username).then((res)=>{
                return res.json();
            }).then((resp)=>{
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error("Invalid username");
                } else {
                    if (resp.password === password) {
                        toast.success("login successful");
                        sessionStorage.setItem('username', username);
                        navigate('/')
                    } else {
                        toast.error("Invalid password");
                    }
                }
            }).catch((err)=>{
                console.log("error due to" + err.message);
            });
        }
    }

    const validate = ()=>{
        let result = true;
        if (username ==='' || username===null) {
            result = false;
        }
        if (password ==='' || password===null) {
            result = false;
        }
        return result;
    }

    return (
        <div className="auth-form-container">
            <h1 className="app-title">Frou Frous</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlfor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username"/>
                <label htmlfor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password"/>
                <button type="submit">Login</button>

            </form>
            <button className="link-button" onClick={()=>navigate('/register')}>Register</button> 
            
            <button className="password-button">Forgot Password</button>

        </div>
    )


}