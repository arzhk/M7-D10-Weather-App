import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SingleForecast from "./SingleForecast";
import "./Favourites.css";

const Favourites = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const forecastDataFetcher = async (query) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}forecast?q=${query}&units=metric${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      const dailyForecast = data.list.filter((forecast) => forecast.dt_txt.includes("12:00:00"));
      return dailyForecast;
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFavourited = async (location) => {
    try {
      const response = await fetch("http://localhost:5555/api/weather/favourite", {
        method: "POST",
        body: JSON.stringify({ location: location }),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!data.errors) {
        setLoading(true);
        props.setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    let data = [];
    props.user.favourites.forEach(async (favourite) => {
      const forecast = await forecastDataFetcher(favourite.location);
      data.push(forecast);
    });
    return data;
  };

  const start = async () => {
    const data = await fetchData();
    if (data) {
      await setFavourites(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    start();
  }, [props.user]);

  return (
    <div id="home-main-container">
      <div className="px-0 mb-md-3 mb-lg-0">
        <div id="home-left" style={{ padding: "50px 36px" }}>
          <h1 className="font-weight-bold mb-5">Favourites</h1>
          <Col xs={12} className="mb-2 px-1">
            <div className="weather-panel forecast d-flex flex-column align-items-center justify-content-center">
              {loading ? (
                <div style={{ width: "100%" }}>
                  <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)">
                    <Skeleton style={{ minHeight: 150 }} />
                  </SkeletonTheme>
                </div>
              ) : favourites.length > 0 ? (
                favourites.map((forecast, index) => {
                  return (
                    <>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <h4 className="mb-0 pl-1">
                          {props.user.favourites[index].location}, {props.user.favourites[index].country}
                        </h4>
                        <Button
                          className="remove-btn rounded-pill"
                          style={{ fontSize: 12 }}
                          onClick={() => toggleFavourited(props.user.favourites[index].location)}
                        >
                          Remove from favourites
                        </Button>
                      </div>

                      <Row className="align-items-center justify-content-center w-100 mt-3">
                        {forecast.map((dailyForecast) => (
                          <SingleForecast data={dailyForecast} />
                        ))}
                      </Row>
                      {props.user.favourites.length > 1 && index !== favourites.length - 1 && (
                        <div className="mb-5"></div>
                      )}
                    </>
                  );
                })
              ) : (
                <h4 style={{ color: "rgba(255,255,255,0.2)" }}>Your favourites are currently empty.</h4>
              )}
            </div>
          </Col>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
