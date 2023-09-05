import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);

  //Changed url
  useEffect(() => {
    fetch("https://at1.api.radio-browser.info/json/countries")
      .then((response) => response.json())
      .then((data) => {
        // Remove duplicates based on country name
        const uniqueCountries = Array.from(
          new Set(data.map((country) => country.name))
        ).map((name) => {
          return data.find((country) => country.name === name);
        });
        setCountries(uniqueCountries);
      });
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountriesContext.Provider>
  );
};
