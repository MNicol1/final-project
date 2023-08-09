import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryPage from "./components/CountryPage";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import { useState, useRef } from "react";
import styled from "styled-components";

const MainLayout = styled.div`
padding-top: 10%; /* adjust this to match your Header's height */


@media (max-width: 1000px) {
padding-top: 22%;
}

/* @media (max-width: 999px) {
padding-top: 10%;
} */

@media (max-width: 769px) {
padding-top: 30%;
}

@media (max-width: 380px) {
padding-top: 40%;
}
`;



const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputElement = useRef(null);



  return (
    <>
      <GlobalStyles />
      <Header setSearchTerm={setSearchTerm} inputElement={inputElement} />
<MainLayout>
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
      </MainLayout>
    </>
  );
};

export default App;
