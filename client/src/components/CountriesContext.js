import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    fetch("https://de1.api.radio-browser.info/json/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountriesContext.Provider>
  );
};
