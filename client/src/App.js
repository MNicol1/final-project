import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryPage from "./components/CountryPage";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";


const App = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/post-users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }, [isAuthenticated]);

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
