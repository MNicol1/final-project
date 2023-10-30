import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { CountriesContext } from "./CountriesContext";

const Countries = ({ searchTerm, setSearchTerm, inputElement }) => {
  useEffect(() => {
    window.scrollTo(0, -30);
  }, []);

  // const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { countries } = useContext(CountriesContext);

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
        <SearchWrapper>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.target.blur(); // This will make the keyboard close
                }
              }}
            />
            <Close onClick={clearSearch}>
              <AiOutlineClose size={20} color="black" />
            </Close>
          </SearchContainer>

          <Space>
            <hr style={{ backgroundColor: "white" }} />
          </Space>
        </SearchWrapper>

        <BigSpace />

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

const BigSpace = styled.div`
  height: 190px;

  @media (max-width: 380px) {
    height: 165px;
  }

  @media (max-width: 767px) {
    height: 150px;
  }
`;

const SearchWrapper = styled.div`
  position: fixed;
  /* top: 0;              */
  left: 40px;
  right: 40px;
  /* height: 150px; */
  padding-top: 40px;
  z-index: 2;

  background-color: transparent;
  backdrop-filter: blur(5px);

  @media (max-width: 380px) {
    left: 30px;
    right: 30px;
    padding-top: 30px;
  }

  @media (max-width: 767px) {
    padding-top: 20px;
  }
`;

const Close = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-top: 3px;
  position: relative;
`;

const Space = styled.div`
  padding-top: 15px;
`;

const Container = styled.div`
  /* position: relative; */

  overflow-x: hidden;
  padding: 0px 47px;
  margin-bottom: 300px;
  @media (max-width: 769px) {
    margin-bottom: 100px;
    padding: 0px 40px;
  }
  @media (max-width: 380px) {
    padding: 0px 30px;
  }
`;

const Main = styled.div`
  padding: 6px 0px;
  transition: 300ms linear;

  transform-origin: left;
  :hover {
    transform: scale(1.2);
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
  font-size: 1.7em;

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

  @media (max-width: 380px) {
    font-size: 20px;
    padding-top: 10px;
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
  color: black;
`;

export default Countries;
