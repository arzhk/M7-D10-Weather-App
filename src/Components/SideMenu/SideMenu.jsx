import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import "./SideMenu.css";

const SideMenu = (props) => {
  const links = [
    { icon: "home", text: "Home", path: "/" },
    { icon: "star", text: "Favourites", path: "/favourites" },
  ];
  const [activeLink, setActiveLink] = useState(0);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userInfoClass, setUserInfoClass] = useState("user-info-panel slide-in-blurred-bottom");

  const showUserInfoHandler = () => {
    if (showUserInfo) {
      setUserInfoClass("user-info-panel slide-out-blurred-bottom");
      setTimeout(() => {
        setShowUserInfo(false);
      }, 500);
    } else {
      setUserInfoClass("user-info-panel slide-in-blurred-bottom");
      setShowUserInfo(true);
    }
  };

  const setActivePageHandler = () => {
    const pathName_formatted = props.location.pathname.split("").splice(1, props.location.pathname.length).join("");
    if (pathName_formatted === "") {
      setActiveLink("home");
    } else {
      setActiveLink(pathName_formatted);
    }
  };

  const activeHandler = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    setActivePageHandler();
  }, [props.location.pathname]);

  return (
    <div id="sidebar-main-container" className="d-flex flex-column justify-content-between align-items-center">
      <div className="sidebar-top">
        {links.map((link, index) => (
          <Link key={index} to={link.path}>
            <Button
              key={index}
              className={activeLink === index ? "sidebar-button active" : "sidebar-button"}
              onClick={() => activeHandler(index)}
            >
              <i className={`fas fa-${link.icon}`}></i>
              <small className="sidebar-button-label mb-0 slide-in-blurred-top">{link.text}</small>
            </Button>
          </Link>
        ))}
      </div>
      <div className="sidebar-bottom">
        <Button variant="danger" className="sidebar-button-notifications">
          <i className="fas fa-bell"></i>
        </Button>
        <div id="user-information">
          <div className="user-icon" onClick={showUserInfoHandler}>
            <img src={props.user.img} />
          </div>
          {showUserInfo && (
            <div className={userInfoClass}>
              <div className="d-flex flex-column">
                <p className="mb-0">{props.user.firstName + " " + props.user.surname}</p>
                <small className="mb-2">{props.user.location}</small>

                <Button className="profile-button mt-1 mb-1">View Profile</Button>
                <Button variant="danger" className="profile-button-logout mt-1" onClick={props.logoutHandler}>
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
