import React from "react";
import Lottie from "lottie-react";
import animationData from "../animation/truck.json";

const LoadingAnimation = () => {
  return (
    <div
      style={{
        height: "100vh", // full viewport height
        width: "100vw",  // full viewport width
        backgroundColor: "white",
        display: "flex", // activate flexbox
        justifyContent: "center", // center horizontally
        alignItems: "center", // center vertically
      }}
    >
      <div style={{ width: 200, height: 200 }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
