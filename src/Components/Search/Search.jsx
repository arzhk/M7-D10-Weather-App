import React from "react";
import { connect } from "react-redux";
import "./Search.css";

export const Search = (props) => {
  return <div id="home-main-container">Search</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
