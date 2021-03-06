import React from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

export const WeatherPanel = ({ home, errors }) => {
  return (
    <>
      <Col md={12} lg={6} className="mb-2 px-1">
        <div className="weather-panel d-flex flex-column align-items-center justify-content-center text-center">
          <img src={`http://openweathermap.org/img/wn/${home.weatherData.weather[0].icon}@2x.png`} />
          <p className="font-weight-bold mb-0">{home.weatherData.weather[0].main}</p>
          <p className="font-weight-light faded-txt mb-0">{home.weatherData.weather[0].description}</p>
        </div>
      </Col>
      <Col xs={12} md={6} lg={3} className="mb-2 px-1">
        <div className="weather-panel d-flex flex-column align-items-center justify-content-center text-center">
          {home.weatherData.main.temp < 10 && <i className="fas fa-icicles"></i>}
          {home.weatherData.main.temp >= 10 && home.weatherData.main.temp < 20 && <i className="fas fa-cloud-sun"></i>}
          {home.weatherData.main.temp > 20 && <i className="fas fa-sun"></i>}
          <h1 className="font-weight-bold mb-0">{home.weatherData.main.temp}°</h1>
          <p className="font-weight-light faded-txt mb-0">Feels like: {home.weatherData.main.feels_like}°</p>
        </div>
      </Col>
      <Col xs={12} md={6} lg={3} className="mb-2 px-1">
        <div className="weather-panel d-flex flex-column align-items-center justify-content-center text-center">
          <i className="fas fa-wind"></i>
          <h1 className="font-weight-bold mb-0">{home.weatherData.wind.speed}</h1>
          <p className="font-weight-light faded-txt mb-0">Degrees: {home.weatherData.wind.deg}°</p>
        </div>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPanel);
