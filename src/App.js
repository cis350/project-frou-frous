
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import  Home  from "./Components/Home";
import { ToastContainer } from "react-toastify";



function App() {
    //const [currentForm, setCurrentForm] = useState('login');
    // const toggle = (formName) => {
    //     setCurrentForm(formName);
    // }
    return (
        <div className="App">
            <ToastContainer></ToastContainer>
            <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                
            </Routes>
            </BrowserRouter>
            {
                //currentForm === "login" ? <Login onFormSwitch={toggle}/> : <Register onFormSwitch={toggle}/>
            }
            
        </div>
    );
}

export default App;