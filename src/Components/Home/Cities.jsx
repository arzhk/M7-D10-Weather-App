import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Home.css";

const cities = [
  { city: "London", country: "United Kingdom" },
  { city: "Paris", country: "France" },
  { city: "Madrid", country: "Spain" },
];

const Cities = (props) => {
  const [temperatures, setTemperatures] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const weatherDataFetcher = async (query) => {
    try {
      props.showErrors(false);
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}weather?q=${query}&units=metric${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        return data.main.temp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    let data = [];
    cities.forEach(async (city) => {
      const cityForecast = await weatherDataFetcher(city.city);
      data.push(cityForecast);
    });
    return data;
  };

  const start = async () => {
    const data = await fetchData();
    if (data) {
      await setTemperatures(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <div id="cities-container" className="d-flex align-items-center justify-content-between">
      {cities.map((city, index) =>
        loading ? (
          <div style={{ width: "30%" }}>
            <SkeletonTheme color="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.1)">
              <Skeleton height={40} />
            </SkeletonTheme>
          </div>
        ) : (
          <div className="city-panel d-flex align-items-center justify-content-start" style={{ padding: "2px 24px" }}>
            <div className="city-info d-flex align-items-center">
              <div>
                <h4 className=" mb-0 mr-2">{temperatures[index]}°</h4>
              </div>

              <div>
                <p className="font-weight-bold">{city.city}</p>
                <small className="font-weight-normal mb-0">{city.country}</small>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
