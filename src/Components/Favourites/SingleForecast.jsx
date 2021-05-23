import React from "react";
import { Col } from "react-bootstrap";

function SingleForecast({ data }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date(data.dt_txt);
  const dayName = days[d.getDay()];

  return (
    <Col xs={12} md={6} lg={2} className="col-20percent px-1 mx-0 mb-2">
      <div className="forecast-daily-panel d-flex flex-column align-items-center justify-content-center text-center">
        <small className="mb-0">{dayName}</small>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
        <p className="font-weight-bold mb-0">{data.main.temp}°</p>
        <p className="font-weight-light faded-txt mb-0">{data.weather[0].description}</p>
      </div>
    </Col>
  );
}

export default SingleForecast;
