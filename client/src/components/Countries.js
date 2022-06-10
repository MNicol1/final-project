import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Countries = () => {
  // return <div>Countries</div>

  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://de1.api.radio-browser.info/json/countries")
        .then((response) => {
          // console.log(response)
          return response.json();
        })
        .then((countries) => {
          // console.log(countries)
          return setCountries(countries);
        });
    };
    fetchData();
  }, []);

  if (countries) {
    const sortedCountries = countries.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return (
      <>
        <div>Browse by country</div>
        <div>
          {countries.map((country, item) => {
            return (
              <NavLink
              key={item}
                to={`/countries/${country.name}`}
                onClick={() => setSelectedCountry()}
              >
                <div>{country.name}</div>
              </NavLink>
            );
          })}
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default Countries;

// console.log(sortedCountries)
// POSSIBLE CODE FOR A-Z setup.
// const letterMap = new Map();
// countries.forEach(word => {
//   const letter = word[0].toUpperCase();
//   if (!letterMap.has(letter)) letterMap.set(letter, []);
//   letterMap.get(letter).push(word);
// });

// console.log(letterMap);
