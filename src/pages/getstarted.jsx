import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/start.jpeg"; 

const Welcome = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate("/home"); 
  };
  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(1.5)', 
    animation: 'moveBackground 10s linear infinite', 
  };

  return (
    <div style={containerStyle}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">
          Next-Gen AI-Powered Perpetuals Trading DApp
        </h1>
        <p className="mb-6 text-lg">
          Trade with confidence! Our cutting-edge AI dynamically hedges positions, auto-adjusts leverage, and deploys real-time liquidation prevention strategies—maximizing profits while minimizing risks.
        </p>
        <button 
         onClick={handleGetStarted} 
        className="px-6 py-2 bg-blue-600 text-black rounded-full hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;