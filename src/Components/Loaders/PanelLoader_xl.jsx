import React from "react";
import ContentLoader from "react-content-loader";
import "./Loaders.css";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={620}
    height={200}
    viewBox="0 0 620 200"
    backgroundColor="rgba(255, 255, 255, 0.15)"
    foregroundColor="rgba(255, 255, 255, 0.05)"
    {...props}
  >
    <rect x="2" y="-1" rx="2" ry="2" width="620" height="200" />
  </ContentLoader>
);

export default MyLoader;
