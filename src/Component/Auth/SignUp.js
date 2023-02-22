import { useContext, useRef, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
const SignUp = () => {
    const authCtx=useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef=useRef();
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail);
    console.log(enteredPassword);
    if(!isLogin)
    {
       if(enteredPassword!==passwordInputRef.current.value);
       {
        alert("password must be same");
       }
    }
    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXiOYJr-9lsF_yoZxTgE3AByKyl3bGlqw";
      
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXiOYJr-9lsF_yoZxTgE3AByKyl3bGlqw";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
         navigate('/welcome');
        // localStorage.setItem('idToken' , JSON.stringify(data))
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("SignUp success");
        localStorage.setItem('email' ,enteredEmail )
        localStorage.setItem('idToken',JSON.stringify(data))
        //authCtx.login(data.idToken);
        
        navigate('/welcome');
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Container className="pt-5">
      <Form className="pt-3" onSubmit={submitHandler}>
        <h1 className="text-center">{isLogin ? "Log In" : "Sign Up"}</h1>
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

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </Form.Group>

        {!isLogin && (
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Confirm Password</Form.Label>
            <Form.Control
              id="password2"
              type="password"
              placeholder="ConfirmPassword"
              required
              ref={confirmPasswordRef}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" >
          {isLogin ? "Log In" : "Sign Up"}
        </Button>

        <div className="text-center pt-3">
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        
        </div>
        <div className="text-center pt-3">  <Link to="/resetPassword">Forgot Password</Link></div>
      </Form>
    </Container>
  );
};
export default SignUp;
