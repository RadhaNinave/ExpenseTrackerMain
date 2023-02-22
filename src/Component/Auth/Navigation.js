import { useContext, Fragment, useEffect } from "react";
import { NavLink } from "react-bootstrap";
import { Router, useNavigate, Link, Routes, useNavigation } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import { Container, Navbar, Nav } from "react-bootstrap";
import UpdateProfile from "../UI/UpdateProfile";
import Welcome from "../UI/Welcome";
import { Route } from "react-router-dom";
import Expense from "./Expense";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/auth";
const Navigation = () => {
  const navigate=useNavigate();
 const dispatch = useDispatch();
 const auth= useSelector((state)=>state.auth.isAuthenticate)
useEffect(()=>{
  if(localStorage.getItem('idToken')==null)
  {
    dispatch(authAction.login())
  }
  else{
    dispatch(authAction.logout())
  }
})
const logoutHandler=async()=>{
  await localStorage.removeItem('idToken');
  navigate("/login");
  dispatch(authAction.logout())
  alert("Logout Successful")
}
  
  //const authCtx=useContext(AuthContext);
  

  return (
   <div>
      <Navbar className="position-fixed" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/about"}>
                About
              </Nav.Link>
           
              <Nav.Link as={Link} to={"/contact"}>
                Contact
              </Nav.Link>
             
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
           
               
              {!auth  && <Nav.Link as={Link} to={"/expense"}>
                  Expense
                </Nav.Link>}
              
             
             {auth && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Routes>
      
     <Route path="/expense" element={<Expense />}/>
    <Route path="/about"></Route>
    <Route path="/home" exact element={<Welcome/>}></Route>
  
    <Route path="/login" element={<SignUp />}></Route>
    <Route path="/update" element={<UpdateProfile/>}/>
    <Route path="/resetPassword" element={<ResetPassword/>}/>
    </Routes>
     </div>
   
  );
};
export default Navigation;
