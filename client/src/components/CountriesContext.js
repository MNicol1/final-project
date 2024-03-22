import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);

  //Changed url
  useEffect(() => {
    fetch("https://nl1.api.radio-browser.info/json/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch countries data");
        }
        return response.json();
      })
      .then((data) => {
        // Remove duplicates based on country name
        const uniqueCountries = Array.from(
          new Set(data.map((country) => country.name))
        ).map((name) => {
          return data.find((country) => country.name === name);
        });
        setCountries(uniqueCountries);
      })
      .catch((err) => {
        setError(err.message); // Set the error message if there's an error
      });
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, error }}>
      {children}
    </CountriesContext.Provider>
  );
};
