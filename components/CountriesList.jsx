import React, { useEffect, useState } from 'react';
import CountryCard from './CountryCard';

import CountryListShimmar from './Countrylistshimmar';

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState(null); // Initially null to indicate loading

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setCountriesData([]); // Fallback to an empty array in case of error
      });
  }, []);

  if (!countriesData) {
    // Show loading spinner when data is being fetched
    return <CountryListShimmar />;
  }

  return (
    <div className="countries-container">
      {countriesData
        .filter((country) => country && country.name && country.name.common) // Check if country and name exist
        .filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase()) || country.region.toLowerCase().includes(query.toLowerCase()) // Filter based on query
        )
        .map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0]}
          />
        ))}
    </div>
  );
}
