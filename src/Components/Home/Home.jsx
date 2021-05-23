import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Alert, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import WeatherPanel from "../WeatherPanel/WeatherPanel";
import Cities from "./Cities";
import Forecast from "./Forecast";

const Home = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isFavourited, setIsFavourited] = useState(false);

  const weatherDataFetcher = async (query) => {
    try {
      props.showErrors(false);
      setLoaded(false);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}weather?q=${query}&units=metric${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
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
    } catch (err) {
      console.log(err);
    }
  };

  const checkFavourited = () => {
    if (props.user.favourites.findIndex((favourite) => favourite.location === props.home.weatherData.name) !== -1) {
      setIsFavourited(true);
    } else {
      setIsFavourited(false);
    }
  };

  const toggleFavourited = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOGIN_URL}/weather/favourite`, {
        method: "POST",
        body: JSON.stringify({ location: props.home.weatherData.name, country: props.home.weatherData.sys.country }),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!data.errors) {
        props.setUser(data);
      }
    } catch (error) {
      console.log(error);
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

  const weatherIconHandler = () => {
    const temp = props.home.weatherData.main.temp;
    if (temp < 10) {
      return (
        <>
          <i className="fas fa-icicles d-flex align-items-center justify-content-center mr-3"></i>
          <p className="font-weight-light mb-0">Today is Cold, remember to wear a coat!</p>
        </>
      );
    } else if (temp > 20) {
      return (
        <>
          <i className="fas fa-sun d-flex align-items-center justify-content-center mr-3"></i>
          <p className="font-weight-light mb-0">Today is Hot, remember to drink plenty of water!</p>
        </>
      );
    } else {
      return (
        <>
          <i className="fas fa-cloud-sun d-flex align-items-center justify-content-center mr-3"></i>
          <p className="font-weight-light mb-0">Today is Mild, make sure to stay warm!</p>
        </>
      );
    }
  };

  useEffect(() => {
    checkFavourited();
    weatherDataFetcher("london");
    forecastDataFetcher("london");
  }, []);

  useEffect(() => {
    checkFavourited();
  }, [props.user.favourites, props.home.weatherData]);

  return (
    <div id="home-main-container">
      <Row>
        <h1 className="font-weight-bold text-dark px-2 mb-3" style={{ letterSpacing: -2 }}>
          Welcome back {props.user.firstName}!
        </h1>
        <Col xs={12} className="px-2 mb-3">
          <div id="home-right" className="d-flex justify-content-lg-between  align-items-lg-start  h-100">
            <div className="home-right-top" style={{ height: "100%" }}>
              <Row className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <Col sm={12} lg={5} className="mb-3 mb-lg-0 py-2 py-lg-0" style={{ height: "100%" }}>
                  <div
                    className="home-right-panel d-flex align-items-center justify-content-lg-start"
                    style={{ height: "100%", width: "100%" }}
                  >
                    {loaded ? (
                      props.home.weatherData && weatherIconHandler()
                    ) : (
                      <div style={{ width: "100%" }}>
                        <SkeletonTheme
                          color="rgba(255,255,255,0.1)"
                          highlightColor="rgba(255,255,255,0.1)"
                          style={{ width: "100%", display: "block" }}
                        >
                          <Skeleton height={40} style={{ minWidth: 250 }} />
                        </SkeletonTheme>
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={7}>
                  <div className="home-right-panel">
                    <Cities />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={12} className="px-2 mb-md-3 mb-lg-0">
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
            <Row>
              <h1 className="font-weight-light mb-5">
                <span className="font-weight-bold">Weather</span> Forecast
              </h1>
            </Row>
            <Row className="align-items-center mb-2">
              {loaded ? (
                <>
                  <h2 className="mr-3 mb-0">Today</h2>
                  <h5 className="country-label font-weight-light mb-0 mr-2">
                    {props.home.weatherData.name}, {props.home.weatherData.sys.country}{" "}
                  </h5>
                  <Button
                    className="favourite-btn d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: 40, height: 40 }}
                    onClick={toggleFavourited}
                  >
                    <i className={isFavourited ? "fa fa-star" : "far fa-star"}></i>
                  </Button>
                </>
              ) : (
                <SkeletonTheme
                  color="rgba(255,255,255,0.1)"
                  highlightColor="rgba(255,255,255,0.1)"
                  style={{ display: "flex" }}
                >
                  <Skeleton width={"Today".length * 20} height={46} className="mr-3 mb-0" />
                  <Skeleton
                    width={
                      props.home.weatherData.length ? props.home.weatherData.name.length * 20 : "London".length * 20
                    }
                    height={46}
                    className="mr-2"
                    style={{ transition: "width 0.25s ease" }}
                  />
                  <Skeleton circle={true} width={46} height={46} />
                </SkeletonTheme>
              )}
            </Row>
            <Row>
              {props.errors.show && <Alert variant="danger">Error: {props.errors.errors.message}</Alert>}
              {!props.errors.show &&
                (loaded ? (
                  <WeatherPanel />
                ) : (
                  <>
                    <Col md={12} lg={6} className="mb-2 pr-1 pl-0">
                      <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)">
                        <Skeleton height={200} />
                      </SkeletonTheme>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-2 px-1">
                      <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)">
                        <Skeleton height={200} />
                      </SkeletonTheme>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-2 px-1">
                      <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)">
                        <Skeleton height={200} />
                      </SkeletonTheme>
                    </Col>
                  </>
                ))}
            </Row>
            <Row>
              {loaded ? (
                <Forecast />
              ) : (
                <Col md={12} className="mb-2 pr-1 pl-0">
                  <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)">
                    <Skeleton height={294} />
                  </SkeletonTheme>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setForecastData: (data) => dispatch({ type: "SET_FORECAST_DATA", payload: data }),
  setWeatherData: (data) => dispatch({ type: "SET_WEATHER_DATA", payload: data }),
  addFavourite: (location) => dispatch({ type: "ADD_FAVOURITE", payload: location }),
  removeFavourite: (location) => dispatch({ type: "REMOVE_FAVOURITE", payload: location }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
