// CountryListShimmar.jsx
import React from 'react';
import './CountryListShimmar.css'; // Import the styles

export default function CountryListShimmar() {
  // Generate an array of placeholders (e.g., 8 placeholders)
  const placeholders = Array.from({ length: 8 });

  return (
    <div className="shimmer-wrapper">
      {placeholders.map((_, index) => (
        <div key={index} className="shimmer-card">
          <div className="shimmer-image shimmer"></div>
          <div className="shimmer shimmer-text" style={{ width: '70%', marginTop: '10px', height: '20px' }}></div>
          <div className="shimmer shimmer-text" style={{ width: '50%', marginTop: '10px', height: '20px' }}></div>
          <div className="shimmer shimmer-text" style={{ width: '90%', marginTop: '10px', height: '20px' }}></div>
        </div>
      ))}
    </div>
  );
}
