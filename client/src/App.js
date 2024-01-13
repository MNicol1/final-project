import { Routes, Route, useLocation } from "react-router-dom";
import Countries from "./components/Countries";
import CountryPage from "./components/CountryPage";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";

import { useRef, useState } from "react";
import AudioFooter from "./components/AudioFooter";

import "./App.css";
import { useAudio } from "./components/AudioContext";

import PlayList from "./components/PlayList";
import MapPage from "./components/MapPage";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputElement = useRef(null);
  const { isAudioFooterVisible } = useAudio();

  //changes made for Map implentation: there is condition wrapped on Header
  const location = useLocation();
  const showHeader = location.pathname !== "/map";
  const isMapPage = location.pathname === "/map"; // or '/map' based on your route
  const mainLayoutStyle = {
    paddingTop: isMapPage ? "0" : "",
  };

  return (
    <>
      <GlobalStyles />

      {showHeader && (
        <Header setSearchTerm={setSearchTerm} inputElement={inputElement} />
      )}

      <div className="main-layout" style={mainLayoutStyle}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/playlist" element={<PlayList />} />

          <Route path="/map" element={<MapPage />} />

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
      </div>
      {isAudioFooterVisible && <AudioFooter />}
    </>
  );
};

export default App;
