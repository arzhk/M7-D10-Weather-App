import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../WeatherPanel/WeatherPanel.css";
import { Col, Row } from "react-bootstrap";

export const Forecast = (props) => {
  const [loading, setLoading] = useState(true);

  const forecastDataFetcher = async (query) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}forecast?q=${query}&units=metric${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      const dailyForecast = data.list.filter((forecast) => forecast.dt_txt.includes("12:00:00"));

      props.setForecastData(dailyForecast);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    forecastDataFetcher("london");
  }, []);

  return (
    <Col xs={12} className="mb-2 px-1">
      <div className="weather-panel forecast d-flex flex-column align-items-start justify-content-center">
        <Col xs={12}>
          <h4>5 Day Forecast</h4>
        </Col>
        <Row className="align-items-center justify-content-center">
          {props.home.forecastData.map((forecast) => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const d = new Date(forecast.dt_txt);
            const dayName = days[d.getDay()];
            return (
              <Col xs={12} md={6} lg={2} className="px-1 mx-2 mb-2">
                <div className="forecast-daily-panel d-flex flex-column align-items-center justify-content-center text-center">
                  <small className="mb-0">{dayName}</small>
                  <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
                  <p className="font-weight-bold mb-0">{forecast.main.temp}°</p>
                  <p className="font-weight-light faded-txt mb-0">{forecast.weather[0].description}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setForecastData: (data) => dispatch({ type: "SET_FORECAST_DATA", payload: data }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
