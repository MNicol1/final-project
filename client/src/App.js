import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryPage from "./components/CountryPage";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";



const App = () => {
 

  return (
    <>
      <GlobalStyles />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/countries" element={<Countries />} />

        <Route path="/countries/:country" element={<CountryPage />} />
      </Routes>
    
    </>
  );
};

export default App;
