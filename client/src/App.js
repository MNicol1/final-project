import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countries from "./components/Countries";
import CountryPage from './components/CountryPage';
import GlobalStyles from './components/GlobalStyles';
import Header from "./components/Header";
import Home from "./components/Home";


const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      
      <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/countries" element={<Countries />} />
      
      <Route path="/countries/:country" element={<CountryPage />}  />
        </Routes>
      
    </Router>
  );
};

export default App;
