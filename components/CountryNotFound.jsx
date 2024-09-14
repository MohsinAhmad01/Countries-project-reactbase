import React from 'react'
import './CountryNotFound.css'; // Import the CSS file

export default function CountryNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-message">
        <h2>Country Not Found</h2>
        <p>We couldn't find the country you were looking for. maybe the url or the CountryName is incorrect.</p>
      </div>
    </div>
  );
}
