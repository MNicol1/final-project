import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { CountriesContext } from "./CountriesContext";

import { useNavigate } from "react-router-dom";

import { BiMessageAltError } from "react-icons/bi";

import { ImEarth } from "react-icons/im";
import "./suggestion.css";

const Countries = ({ searchTerm, setSearchTerm, inputElement }) => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");

  // This is for scroll to top issue :

  useEffect(() => {
    window.scrollTo(0, -30);
  }, []);

  const navigate = useNavigate();

  // const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [suggestions, setSuggestions] = useState([]);

  const { countries, error } = useContext(CountriesContext);

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
      setSuggestions([]);
      e.target.blur(); // Closes the keyboard on mobile devices
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setTempSearchTerm(userInput);

    if (userInput.length > 1) {
      const filteredSuggestions = countries
        .filter((country) =>
          country.name.toLowerCase().includes(userInput.toLowerCase())
        )
        .map((country) => country.name)
        .slice(0, 10); // Limit the number of suggestions

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]); // Close the dropdown
      }
    };

    // Bind the event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      // Unbind the event listeners on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const dropdownRef = useRef(null);

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
            title="Clear search"
            style={{ padding: "0 2px 0 5px", cursor: "pointer" }}
            onClick={clearSearch}
            size={22}
            color="black"
          />

          <Input
            title="Search"
            ref={inputElement}
            type="text"
            autoComplete="off"
            name="search"
            placeholder="Search..."
            onChange={handleInputChange}
            onKeyDown={handleSearch}
          />
          <Icon size={20} onClick={handleSearch} title="Search" />
          {suggestions.length > 0 && (
            <ul className="autocomplete-dropdown" ref={dropdownRef}>
              <div className="suggestion-title">suggestions...</div>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const countryObject = countries.find(
                      (country) => country.name === suggestion
                    );
                    if (countryObject) {
                      setTempSearchTerm(suggestion);
                      setSearchTerm(suggestion);
                      setSuggestions([]);
                      setSelectedCountry(countryObject);
                      navigate(`/countries/${encodeURIComponent(suggestion)}`);
                    }
                  }}
                >
                  <div className="icon-container">
                    {" "}
                    <Icon style={{ color: "black" }} />
                  </div>
                  <div className="text-container"> {suggestion}</div>
                </li>
              ))}
            </ul>
          )}
        </SearchContainer>

        <Space>
          <Horizontal />
        </Space>
      </SearchWrapper>

      <BigSpace />

      {error ? ( // Check if there's an error and render the error message
        <ErrorMessage>
          <span>
            <BiMessageAltError size={40} />
          </span>
          An error occurred on the server: Please refresh your browser, or try
          again later.
        </ErrorMessage>
      ) : filteredCountries.length > 0 ? (
        filteredCountries.map((country, index) => (
          <Main key={index}>
            <Country
              to={`/countries/${country.name}`}
              onClick={() => setSelectedCountry(country)}
            >
              {country.name}
            </Country>
          </Main>
        ))
      ) : searchTerm ? (
        <Error>
          <ImEarth size={28} /> No countries match your search. Please try
          again.
        </Error>
      ) : null}
    </Container>
  );
};

// STYLING

const Horizontal = styled.hr`
  box-shadow: 0px 2px 0px 0px white;
  border: none;
  height: 1px;
  width: 100%;
  margin: 0;
`;

const ErrorMessage = styled.div`
  color: white;

  position: fixed;

  width: 100%;
  padding-top: 10px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Error = styled.div`
  margin: 0; // Resets any margin
  padding: 10px 0;
  font-family: inherit;
  font-size: 1.3em;
  overflow-y: hidden;
  overflow-x: hidden;
  max-height: 50px; // Adjust as needed

  @media (max-width: 880px) {
    font-size: 18px;
    padding: 20px 0;
  }

  @media (max-width: 380px) {
    font-size: 18px;
    padding: 25px 0;
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
  padding-top: 20px;
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
  padding-top: 25px;
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
  transition: 450ms linear;

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
  /* overflow: hidden; */
  position: relative;

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
