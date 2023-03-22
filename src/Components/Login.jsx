//import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = (props) => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');





    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if(validate()){
            fetch("http://localhost:8000/user/" + username).then((res)=>{
                return res.json();
            }).then((resp)=> {
                console.log("resp")
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    console.log("in here")
                    toast.error("Invalid username");
                } else {
                    if (resp.password === password) {
                        toast.success("login successful");
                        sessionStorage.setItem('username', username);
                        window.location.href = '/';
                    } else {
                        console.log(resp.password)
                        toast.error("Invalid password");
                    }
                }
            }).catch((err)=>{
                console.log("error due to " + err.message);
            });
        }
    }

    const validate = ()=>{
        let result = true;
        console.log(username);
        if (username ==='' || username===null) {
            result = false;
            toast.warning("Please enter username");
        }
        if (password ==='' || password===null) {
            result = false;
            toast.warning("please enter password");
        }
        return result;
    }

    return (
        <div className="auth-form-container">
            <h1 className="app-title">Frou Frous</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password"/>
                <button type="submit">Login</button>

            </form>

            <a href = '/register'>
            <button className="link-button">Register</button> 
            </a>
            
            
            <button className="password-button">Forgot Password</button>

        </div>
    )


}