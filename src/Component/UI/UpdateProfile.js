import { Fragment, useContext, useRef } from "react";
import { Container,Navbar,Form,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../store/AuthContext";
const UpdateProfile=()=> {

  useEffect(()=>{
    async function fetchProfile()
    {
      try{
        const res=  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAXiOYJr-9lsF_yoZxTgE3AByKyl3bGlqw",{
          method:"POST",
          body:JSON.stringify({
            idToken : JSON.parse(localStorage.getItem("idToken")).idToken
          }),
          headers:{"Content-Type": "application/json",
        }
        });
        const data=await res.json();
        console.log(data.users[0].photoUrl);
        console.log(data.users[0].displayName);
        if(res.ok){
          nameInputRef.current.value = data.users[0].displayName
          photoInputRef.current.value = data.users[0].photoUrl
      }
    } 
  catch(error){
      console.log(error.message)
    }
  }

  fetchProfile();
      
    
  },[])
  const nameInputRef=useRef();
  const photoInputRef=useRef();
  const navigate=useNavigate();

  const onCancelhandler=(e)=>{
      e.preventDefault();
      navigate('/')


  }

  const updateHandler= async(e)=>{
     
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAXiOYJr-9lsF_yoZxTgE3AByKyl3bGlqw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: JSON.parse(localStorage.getItem("idToken")).idToken,
            displayName: nameInputRef.current.value,
            photoUrl: photoInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

    nameInputRef.current.value = "";
      photoInputRef.current.value = "";

      if (res.ok) {
        alert("your Profile is update successfully");
        navigate("/");
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }

  }



   return(
       
             <Fragment>
     <Navbar>
      <Container>
        <Navbar.Brand >Winners never quite, Quiters never win</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Your Profile is 64% completed, Complete Profile has higher chances to landing a job <Link to='/update'>Complete Now</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <hr />
        <h4>Contact details</h4>
        <Button  className="cancel" onClick={onCancelhandler}>Cancel</Button>
        <Container className="pt-5">
      <Form className="pt-3" onSubmit={updateHandler}>
        <h1 className="text-center"></h1>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fullName">Full Name</Form.Label>
          <Form.Control
            id="fullName"
            type="text"
            placeholder="Enter Full name"
            required
            ref={nameInputRef}
           
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Profile Photo Url</Form.Label>
          <Form.Control
            id="photo"
            type="text"
           ref={photoInputRef}
            required
           
          />
        </Form.Group>

      
        <Button variant="primary" type="submit" >
          UpdateDetails
        </Button>

        
      </Form>
    </Container>

       </Fragment>
        
    )

}

export default UpdateProfile;