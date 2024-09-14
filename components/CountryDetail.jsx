
import React, { useEffect, useState } from 'react'
import './CountryDetail.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import CountryNotFound from './CountryNotFound'
import CountryDetailShimmar from './CountryDetailShimmar'; // Correct casing
import Loading from './Loading';


export default function CountryDetail() {
  const params = useParams()
  const countryName = params.country
  const navigate = useNavigate() // To programmatically navigate to another country page

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0]?.common || '',
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital || [],
          flag: data.flags.svg,
          tld: data.tld,
          languages: Object.values(data.languages).join(', '),
          currencies: Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(', '),
          borders: data.borders || [], // Ensure borders exist
        })
      })
      .catch((err) => {
        setNotFound(true)
      })
  }, [countryName]) // Re-fetch data when countryName changes

  const handleBorderClick = (borderCode) => {
    // Fetch full country name by border code
    fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
      .then((res) => res.json())
      .then(([data]) => {
        const newCountryName = data.name.common
        navigate(`/${newCountryName.toLowerCase()}`) // Redirect to the new country's page
      })
      .catch((err) => {
        console.error('Error fetching border country data:', err)
      })
  }

  if (notFound) {
    return <>
    
    <CountryNotFound />
    </>
  }

  return countryData === null ? (
    <CountryDetailShimmar />
  ) : (
    <main>
      <div className="country-details-container">
        <span className="back-button" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
              </p>
              <p>
                <b>Population: {countryData.population.toLocaleString('en-IN')}</b>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
              </p>
              <p>
                <b>Capital: {countryData.capital.join(', ')}</b>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
              </p>
            </div>
            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {
                countryData.borders.length > 0
                  ? countryData.borders.map((border) => (
                      <span
                        key={border}
                        className="border-link"
                        onClick={() => handleBorderClick(border)}
                        style={{ cursor: 'pointer', border:'2px solid blue',padding:'5px',borderRadius:'6px' }}
                      >
                        {border}
                      </span>
                    ))
                  : <span>No border countries</span>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
