import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";



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
      <Container>
        <h2>Browse by country:</h2>
        <hr style={{backgroundColor: "white"}}/>
        <div>
          {countries.map((country, item) => {
            return (
              <Country
              key={item}
                to={`/countries/${country.name}`}
                onClick={() => setSelectedCountry()}
              >
                <CountryName>{country.name}</CountryName>
              </Country>
            );
          })}
        </div>
      </Container>
    );
  } else {
    return null;
  }
};


const Container = styled.div`
padding: 40px;
`

const Country = styled(NavLink)`
text-decoration: none;
color: inherit;
font-family: inherit;
font-size: 1.2em;

`
const CountryName = styled.div`
padding: 1px 0px; 
`

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
