import { Fragment, useRef } from "react";
import { Form,Container,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ResetPassword = () =>{
    const navigate=useNavigate()
    
   
        const emailInputRef = useRef();
        const resetPassword = async(e) =>{
            e.preventDefault();
            try{
                const enteredEmail=emailInputRef.current.value;
                console.log(enteredEmail);
                const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAXiOYJr-9lsF_yoZxTgE3AByKyl3bGlqw',{
                    method:"POST",
                    body:JSON.stringify({
                        requestType:'PASSWORD_RESET',
                        email:enteredEmail
                    }),
                    headers :{
                        'Content-type':"application/json"
                    }
                })
                const data = await res.json()
                console.log(data);
                if(res.ok){
                    alert("password reset successfully");
                    navigate('/login');
                }
            }
            catch(e)
            {
                console.log(e.message);
                alert("something went wrong");
            }
            
        }
    return(
        <Fragment>

               <Container className="pt-5">
      <Form className="pt-3" onSubmit={resetPassword}>
        <h1 className="text-center"></h1>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter email"
            required
            ref={emailInputRef}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
        </Form>
        </Container>
        </Fragment>
    )

}
export default ResetPassword;