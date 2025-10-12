import React from "react";
import Lottie from "lottie-react";
import animationData from "../animation/truck.json";

const LoadingAnimation = () => {
  return (
    <div
      style={{
        position: "fixed",      
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "white", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,           
      }}
    >
      <div style={{ width: 450, height: 450 }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
