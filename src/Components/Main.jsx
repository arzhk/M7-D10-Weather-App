import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SideMenu from "./SideMenu/SideMenu";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Favourites from "./Favourites/Favourites";
import Login from "./Login/Login";

const Main = (props) => {
  const authorise = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOGIN_URL}/users/me`, { credentials: "include" });
      const data = await response.json();
      if (!data.errors) {
        props.history.push("/");
        props.setUser(data);
        setTimeout(() => {
          props.setLoading(false);
        }, 1000);
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

  const logoutHandler = async () => {
    try {
      await fetch(`${process.env.REACT_APP_LOGIN_URL}/users/logout`, { credentials: "include" });
      setTimeout(() => {
        props.history.push("/login");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.history.location.pathname !== "/login") authorise();
  }, []);

  useEffect(() => {
    authorise();
  }, [props.user.username, props.history.location.pathname]);

  return (
    <Router>
      {!props.user.username && (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}
      {props.app.loading ? (
        <div id="main-loader-wrapper">
          <div id="main-loader" className="d-flex align-items-center">
            <h5 className="font-weight-bold mb-0 mr-3">Loading...</h5>
            <Spinner variant="primary" animation="grow" role="status" size="sm" className="mr-1"></Spinner>
            <Spinner variant="primary" animation="grow" role="status" size="sm" className="mr-1"></Spinner>
            <Spinner variant="primary" animation="grow" role="status" size="sm"></Spinner>
          </div>
        </div>
      ) : (
        props.user.username && (
          <>
            <Route path="/">
              <SideMenu logoutHandler={logoutHandler} {...props} />
            </Route>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />
              <Route path="/favourites" exact component={Favourites} />
            </Switch>
          </>
        )
      )}
    </Router>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setLoading: (boolean) => dispatch({ type: "SET_LOADING", payload: boolean }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
