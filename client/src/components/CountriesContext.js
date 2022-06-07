// import { createContext, useState, useEffect } from "react";

// export const CountriesContext = createContext(null);

// export const CountriesProvider = ({ children }) => {
//     const [countries, setCountries] = useState();

//     useEffect(() => {
//         const fetchData = () => { 
//         fetch("https://de1.api.radio-browser.info/json/countries")
//         .then((response) => { 
//         // console.log(response)
//         return response.json()
//         })
//         .then((countries) => { 
//         // console.log(countries)
//         return setCountries(countries)
//         })
//         }
//         fetchData()
//           }, [])

//   return (
//     <CountriesContext.Provider value={{ countries, setCountries }}>{children}</CountriesContext.Provider>
//   );
// };
