import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import "./SideMenu.css";

export const SideMenu = ({ user }) => {
  const links = [
    { icon: "home", text: "Home" },
    { icon: "cloud", text: "Weather" },
    { icon: "search", text: "Search" },
    { icon: "star", text: "Favourites" },
  ];

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

  return (
    <div id="sidebar-main-container" className="d-flex flex-column justify-content-between align-items-center">
      <div className="sidebar-top">
        {links.map((link) => (
          <Button className="sidebar-button">
            <i className={`fas fa-${link.icon}`}></i>
            <small className="sidebar-button-label mb-0 slide-in-blurred-top">{link.text}</small>
          </Button>
        ))}
      </div>
      <div className="sidebar-bottom">
        <Button className="sidebar-button-notifications">
          <i className="fas fa-bell"></i>
        </Button>
        <div id="user-information">
          <div className="user-icon" onClick={showUserInfoHandler}>
            <img src={user.img} />
          </div>
          {showUserInfo && (
            <div className={userInfoClass}>
              <p className="mb-0">{user.firstName + " " + user.surname}</p>
              <small>{user.location}</small>
              <Button className="profile-button mt-1">View Profile</Button>
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
