import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryPage from "./components/CountryPage";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import { useState, useRef } from "react";
import styled from "styled-components";

const MainContent = styled.main`
  padding-top: 10%; /* adjust this to match your Header's height */

  @media (max-width: 769px) {
    padding-top: 35%;
  }
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputElement = useRef(null);

  return (
    <>
      <GlobalStyles />
      <Header setSearchTerm={setSearchTerm} inputElement={inputElement} />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/countries"
            element={
              <Countries
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                inputElement={inputElement}
              />
            }
          />

          <Route path="/countries/:country" element={<CountryPage />} />
        </Routes>
      </MainContent>
    </>
  );
};

export default App;
