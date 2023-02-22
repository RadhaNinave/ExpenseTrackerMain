import UpdateProfile from './Component/UI/UpdateProfile';
import { Nav, NavLink } from 'react-bootstrap';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Component/Auth/SignUp';
import Welcome from './Component/UI/Welcome';
import Navigation from './Component/Auth/Navigation';
import ResetPassword from './Component/Auth/ResetPassword';
import Expense from './Component/Auth/Expense';
import { useContext } from 'react';
import AuthContext from './Component/store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn;


  return (
    <div className="App">
      <Navigation />
      

    
       
     
   
    </div>
  );
}

export default App;
