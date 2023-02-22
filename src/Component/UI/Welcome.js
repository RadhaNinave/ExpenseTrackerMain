import { Fragment } from "react"
import { Navbar, Container,Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import './Welcome.css';

const Welcome = () =>{
      const verifyEmail = async(e) =>{
        e.preventDefault();
        try{
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAXiOYJr-9lsF_yoZxTgE3AByKyl3bGlqw",{
          method:"POST",
          body:JSON.stringify({
            idToken:JSON.parse(localStorage.getItem("idToken")).idToken,
            requestType:"VERIFY_EMAIL"
          }),
          headers :{
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        console.log(data)
        if(res.ok){
          alert("Email verify successfully")
        }
       
        }
        catch(e){
        console.log("try again");
        }
      }
     
    


      

    return (
       <Fragment>
     <Navbar>
      <Container>
        <Navbar.Brand href="#home">Welcome to Expense Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Your Profile is Incomplete: <Link to='/update'>Complete Now</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <hr />
        <h1>
          <Button variant="success" onClick={verifyEmail}>Verify Email</Button>
        </h1>
       </Fragment>
    )
}
export default Welcome;