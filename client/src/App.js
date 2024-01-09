import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputElement = useRef(null);

  const { isAudioFooterVisible } = useAudio();

  return (
    <>
      <GlobalStyles />
      <Header setSearchTerm={setSearchTerm} inputElement={inputElement} />
      <div className="main-layout">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/playlist" element={<PlayList />} />



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
