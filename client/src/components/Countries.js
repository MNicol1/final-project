import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Countries = () => {
  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://de1.api.radio-browser.info/json/countries")
        .then((response) => {
          return response.json();
        })
        .then((countries) => {
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
        <Heading>Browse by country:</Heading>
        <hr style={{ backgroundColor: "white" }} />

        {countries.map((country, item) => {
          return (
            <Main key={item}>
              <Country
                to={`/countries/${country.name}`}
                onClick={() => setSelectedCountry()}
              >
                {country.name}
              </Country>
            </Main>
          );
        })}
      </Container>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  padding: 40px;
`;

const Main = styled.div`
  padding: 1px 0px;
  transition: 300ms linear;
  max-width: 57%;
  transform-origin: left top;
  :hover {
    transform: scale(1.3);
  }

  
  @media (max-width: 880px) {
max-width: 100%;

border-bottom: solid white 1px;

}
`;

const Heading = styled.h2`
  font-size: 1.8em;

  @media (max-width: 880px) {
font-size: 1.4em;

}
`;
const Country = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  font-size: 1.4em;

  @media (max-width: 880px) {
font-size: 18px;
padding-top: 7px;


}


`;

export default Countries;
