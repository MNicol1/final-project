import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Countries = () => {
  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const inputElement = useRef(null);

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

    const clearSearch = () => {
      setSearchTerm("");
      inputElement.current.value = "";
    };

    return (
      <Container>
        <Heading>Browse by country:</Heading>

        <SearchContainer>
          <Icon />

          <Input
            ref={inputElement}
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Close onClick={clearSearch}>
            <AiOutlineClose size={20} color="black" />
          </Close>
        </SearchContainer>

        <Space>
          <hr style={{ backgroundColor: "white" }} />
        </Space>

        {countries
          .filter((country) => {
            if (searchTerm === "") {
              return country;
            } else if (
              country.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return country;
            }
          })
          .map((country, item) => {
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

// STYLING

const Close = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-top: 3px;
  position: relative;
`;

const Space = styled.div`
  padding: 5px 0px;
`;

const Container = styled.div`
  padding: 40px;
margin-bottom: 300px;
`;

const Main = styled.div`
  padding: 3px 0px;
  transition: 300ms linear;
  max-width: 57%;
  transform-origin: left top;
  :hover {
    transform: scale(1.3);
  }

  @media (max-width: 880px) {
    max-width: 100%;

    border-bottom: solid white 1px;
    padding: 15px 0px;

    transition: none;
    :hover {
      transform: none;
    }
  }
`;

const Heading = styled.h2`
  font-size: 1.8em;

  @media (max-width: 880px) {
    font-size: 1.8em;
  }

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
    font-size: 22px;
    padding-top: 20px;
  }
`;

const SearchContainer = styled.div`
  border: 2px solid black;
  border-radius: 30px;
  height: 20px;
  width: 300px;
  /* background: #a7e1f8; */
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 410px) {
    width: 90%;
  }
`;

const Input = styled.input`
  font-family: inherit;
  font-size: inherit;
  flex-grow: 1;
  background: inherit;
  border: 0;
  border-radius: 30px;
  padding: 6px;
  outline: none;

  @media (max-width: 410px) {
    width: 90%;
  }
`;

const Icon = styled(FiSearch)`
  width: 20px;
  cursor: pointer;
  color: black;
`;

export default Countries;
