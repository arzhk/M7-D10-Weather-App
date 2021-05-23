import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
      }, 1500);
    }
  };

  useEffect(() => {
    start();
  }, []);

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
                      <h4 className="w-100 mb-0 pl-1">
                        {props.user.favourites[index].location}, {props.user.favourites[index].country}
                      </h4>
                      <Row className="align-items-center justify-content-center w-100 mt-3">
                        {forecast.map((dailyForecast) => {
                          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                          const d = new Date(dailyForecast.dt_txt);
                          const dayName = days[d.getDay()];
                          return (
                            <Col key={index} xs={12} md={6} lg={2} className="col-20percent px-1 mx-0 mb-2">
                              <div className="forecast-daily-panel d-flex flex-column align-items-center justify-content-center text-center">
                                <small className="mb-0">{dayName}</small>
                                <img src={`http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`} />
                                <p className="font-weight-bold mb-0">{dailyForecast.main.temp}°</p>
                                <p className="font-weight-light faded-txt mb-0">
                                  {dailyForecast.weather[0].description}
                                </p>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                      {props.user.favourites.length > 1 && <div className="mb-5"></div>}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
