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
import Premium from './Component/Auth/Premium';
import { useSelector } from 'react-redux';
function App() {
  const themeMode = useSelector((state) => state.theme.theme);


  return (
    <div className="App">
      <div className={themeMode === 'dark' ? 'dark' : ''}>
      <Premium />
      <Navigation />
      </div>
      

    
       
     
   
    </div>
  );
}

export default App;
