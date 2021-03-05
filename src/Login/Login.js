import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    // console.log("button is clicked");
    //firebase code
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const register = (e) => {
    e.preventDefault();
    // console.log("button1 is clicked");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG24.png"
          alt="loginpage"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Signin</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={signIn}
            style={{
              backgroundColor: " #f0c14b",
              border: "1px solid",
              marginTop: "10px",
              borderColor: " #a88734 #9c7e31 #846a29",
              color: "#111",
              width: "100%",
              height: "30px",
            }}
          >
            Sign in
          </Button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <Button
          onClick={register}
          className="login__registerButton"
          style={{
            backgroundColor: " lightgrey",
            border: "1px solid",
            marginTop: "10px",
            borderColor: " #a88734 #9c7e31 #846a29",
            color: "#111",
            width: "100%",
            height: "30px",
          }}
        >
          Create your Amazon Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
