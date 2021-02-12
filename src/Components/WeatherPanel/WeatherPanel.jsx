import React from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";
import "./WeatherPanel.css";

export const WeatherPanel = ({ user, search, errors }) => {
  return (
    <Col xs={8}>
      <div id="weather-panel">asdasdsad</div>
    </Col>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPanel);
