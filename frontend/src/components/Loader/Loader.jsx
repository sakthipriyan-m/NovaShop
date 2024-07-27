import React from "react";
import { Spinner } from "react-bootstrap";
import './Styles.css'

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner-container">
        <Spinner
          animation="border"
          role="status"
          className="loader"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div className="loader-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
