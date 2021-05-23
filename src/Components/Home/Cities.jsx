import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Home.css";

export const Cities = (props) => {
  /*   const weatherDataFetcher = async () => {
        try {
            const response = await fetch("")
        } catch (err) {
            console.log(err)
        }
    }
 */
  return (
    <div id="cities-container" className="d-flex align-items-center justify-content-between">
      <div className="city-panel d-flex align-items-center justify-content-start">
        <div className="city-info">
          <p className="font-weight-bold">
            London<span className="font-weight-normal">, United Kingdom</span>
          </p>
          <small>Temperature°</small>
        </div>
      </div>
      <div className="city-panel d-flex align-items-center justify-content-start">
        <div className="city-info">
          <p className="font-weight-bold">
            Paris<span className="font-weight-normal">, France</span>
          </p>
          <small>Temperature°</small>
        </div>
      </div>
      <div className="city-panel d-flex align-items-center justify-content-start">
        <div className="city-info">
          <p className="font-weight-bold">
            Madrid<span className="font-weight-normal">, Spain</span>
          </p>
          <small>Temperature°</small>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
