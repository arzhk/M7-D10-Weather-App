import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Alert } from "react-bootstrap";
import "./Login.css";

const Login = (props) => {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = async (event, guest = false) => {
    event.preventDefault();
    try {
      props.setError([]);
      props.showErrors(false);
      const response = await fetch("http://localhost:5555/api/users/login", {
        method: "POST",
        body: JSON.stringify(guest ? { username: "guest", password: "guestpassword" } : inputData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!data.errors) {
        props.setUser({ ...data });
        setIsLoggedIn(true);
        props.setLoading(true);
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      } else {
        props.setError(data.errors);
        props.showErrors(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authorise_login = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/users/me", { credentials: "include" });
      const data = await response.json();
      if (!data.errors) {
        props.setLoading(true);
        props.history.push("/");
        props.setUser(data);
        setTimeout(() => {
          props.setLoading(false);
        }, 2000);
      } else {
        props.setUser({
          firstName: "",
          surname: "",
          username: "",
          location: "",
          img: "",
          favourites: [],
        });

        props.history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    authorise_login();
  }, []);

  return (
    <div id="login-main-wrap">
      <div id="login-main-container" className="d-flex flex-column">
        <h3 className="font-weight-bold mb-3">Login</h3>
        {props.errors.show &&
          props.errors.errors.map((error, key) => (
            <Alert key={key} variant="danger">
              {error.msg}
            </Alert>
          ))}
        {isLoggedIn && <Alert variant="success">Logging In...</Alert>}
        <form id="login-form" className="text-center mb-2" onSubmit={loginHandler}>
          <input
            name="username"
            type="text"
            placeholder="Username..."
            onChange={inputDataHandler}
            value={inputData.username}
          />

          <input
            name="password"
            type="password"
            placeholder="Password..."
            onChange={inputDataHandler}
            value={inputData.password}
          />

          <Button className="login-btn" type="submit">
            Login
          </Button>
        </form>
        <div className="text-center d-flex flex-column  align-items-center">
          <small className="font-weight-bold mb-0">or</small>
          <Button variant="light" className="register-btn mt-2" onClick={(event) => loginHandler(event, true)}>
            Sign in as a guest
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setLoading: (boolean) => dispatch({ type: "SET_LOADING", payload: boolean }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
