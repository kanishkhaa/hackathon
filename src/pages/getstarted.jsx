import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/start.jpeg"; 

const Welcome = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate("/form"); 
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
        AI-Powered Prescription Management Platform
        </h1>
        <p className="mb-6 text-lg">
        Manage your medications safely and smartly! Our AI-driven platform offers intelligent prescription scanning, automatic drug interaction checks, and comprehensive health insights—ensuring medication safety and peace of mind.
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