import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { CountriesContext } from "./CountriesContext";

const Countries = ({ searchTerm, setSearchTerm, inputElement }) => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");

  // This is for scroll to top issue :

  useEffect(() => {
    window.scrollTo(0, -30);
  }, []);

  // const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { countries } = useContext(CountriesContext);

  const filterCountries = (country) => {
    return (
      searchTerm === "" ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCountries = countries
    ? countries.filter(filterCountries).sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      })
    : [];

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const trimmedSearchTerm = tempSearchTerm.trim();
      setSearchTerm(trimmedSearchTerm);
      e.target.blur(); // Closes the keyboard on mobile devices
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setTempSearchTerm("");
    inputElement.current.value = "";
  };

  return (
    <Container>
      <SearchWrapper>
        <Heading>Browse by country:</Heading>
        <SearchContainer>
          <AiOutlineClose
            style={{ padding: "0 5px", cursor: "pointer" }}
            onClick={clearSearch}
            size={22}
            color="black"
          />

          <Input
            ref={inputElement}
            type="text"
            autoComplete="off"
            name="search"
            placeholder="Search..."
            onChange={(e) => setTempSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Icon size={20} onClick={handleSearch} />
        </SearchContainer>

        <Space>
          <hr style={{ backgroundColor: "white" }} />
        </Space>
      </SearchWrapper>

      <BigSpace />

      {filteredCountries.length > 0
        ? filteredCountries.map((country, index) => (
            <Main key={index}>
              <Country
                to={`/countries/${country.name}`}
                onClick={() => setSelectedCountry(country)}
              >
                {country.name}
              </Country>
            </Main>
          ))
        : searchTerm && (
            <Error>No countries match your search. Please try again.</Error>
          )}
    </Container>
  );
};

// STYLING

const Error = styled.div`
  margin: 0; // Resets any margin
  padding: 10px 0;
  font-family: inherit;
  font-size: 1.4em;
  overflow-y: hidden;
  overflow-x: hidden;
  max-height: 50px; // Adjust as needed

  @media (max-width: 880px) {
    font-size: 22px;
    padding: 20px 0;
  }

  @media (max-width: 380px) {
    font-size: 20px;
    padding: 20px 0;
  }
`;

const BigSpace = styled.div`
  height: 190px;

  @media (max-width: 380px) {
    height: 165px;
    margin-bottom: 25px;
  }

  @media (max-width: 767px) {
    height: 150px;
    margin-bottom: 25px;
  }
`;

const SearchWrapper = styled.div`
  position: fixed;

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

// const Close = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding-top: 3px;
//   position: relative;
// `;

const Space = styled.div`
  padding-top: 15px;
`;

const Container = styled.div`
  /* position: relative; */
  overflow-y: hidden; // Add this line
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
  width: 22px;
  color: black;
  padding: 0 5px;
  cursor: pointer;
`;

export default Countries;
