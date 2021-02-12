import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Home.css";
import { Col, Row, Alert } from "react-bootstrap";
import WeatherPanel from "../WeatherPanel/WeatherPanel";
import PanelLoaderXl from "../Loaders/PanelLoader_xl";
import PanelLoaderLg from "../Loaders/PanelLoader_lg";
import PanelLoaderSm from "../Loaders/PanelLoader_sm";
import Cities from "./Cities";
import Forecast from "./Forecast";

export const Home = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const weatherDataFetcher = async (query) => {
    try {
      props.showErrors(false);
      setLoaded(false);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}weather?q=${query}&units=metric${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      if (data.cod === 200) {
        props.setWeatherData(data);
        setTimeout(() => {
          setLoaded(true);
        }, 1000);
      } else {
        props.setError(data);
        props.showErrors(true);
      }
      setSearchInput("");
    } catch (err) {
      console.log(err);
    }
  };

  const forecastDataFetcher = async (query) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}forecast?q=${query}&units=metric${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      const dailyForecast = data.list.filter((forecast) => forecast.dt_txt.includes("12:00:00"));
      props.setForecastData(dailyForecast);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchFetcher = async (event) => {
    if (event.keyCode === 13) {
      weatherDataFetcher(searchInput);
      forecastDataFetcher(searchInput);
    }
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    weatherDataFetcher("london");
  }, []);

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
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(event) => searchInputHandler(event)}
                onKeyDown={(event) => searchFetcher(event)}
              />
            </div>
            <div id="weather-forecast">
              <Row>
                <h1 className="font-weight-light mb-5">
                  <span className="font-weight-bold">Weather</span> Forecast
                </h1>
              </Row>
              {loaded && (
                <>
                  <Row>
                    <h2 className="mr-3">Today</h2>
                    <h5 className="country-label font-weight-light">
                      {props.home.weatherData.name}, {props.home.weatherData.sys.country}{" "}
                    </h5>
                  </Row>
                </>
              )}

              <Row>
                {props.errors.show && <Alert variant="danger">Error: {props.errors.errors.message}</Alert>}
                {!props.errors.show &&
                  (loaded ? (
                    <WeatherPanel />
                  ) : (
                    <>
                      <PanelLoaderLg className="mr-2 mb-2" />
                      <PanelLoaderSm className="mr-2 mb-2" />
                      <PanelLoaderSm className="mb-2" />
                    </>
                  ))}
              </Row>
              <Row>{loaded ? <Forecast /> : <PanelLoaderXl />}</Row>
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <div id="home-right" className="d-flex flex-column justify-content-around align-items-start">
            <div className="home-right-top">aaaaaa</div>
            <div className="home-right-middle">aaaaaa</div>
            <div className="home-right-bottom">
              <h4 className="font-weight-bold">City</h4>
              <Cities />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setForecastData: (data) => dispatch({ type: "SET_FORECAST_DATA", payload: data }),
  setWeatherData: (data) => dispatch({ type: "SET_WEATHER_DATA", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
