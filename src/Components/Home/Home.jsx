import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Home.css";
import { Col, Row } from "react-bootstrap";
import WeatherPanel from "../WeatherPanel/WeatherPanel";

export const Home = ({ user, search, errors }) => {
  const [weatherData, setWeatherData] = useState({});

  const weatherDataFetcher = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="home-main-container">
      <Row>
        <Col xs={8}>
          <div id="home-left">
            <div className="search-container d-flex align-items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input type="text" placeholder="Search" />
            </div>
            <div id="weather-forecast">
              <h1 className="font-weight-light mb-4">
                <span className="font-weight-bold">Weather</span> Forecast
              </h1>
              <h5>{user.location}</h5>
              <Row>
                <WeatherPanel />
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <div id="home-right"></div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
