import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";


function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const toggle = (formName) => {
        setCurrentForm(formName);
    }
    return (
        <div className="App">
            {
                currentForm === "login" ? <Login onFormSwitch={toggle}/> : <Register onFormSwitch={toggle}/>
            }
            
        </div>
    );
}

export default App;