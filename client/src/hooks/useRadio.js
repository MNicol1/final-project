


// V2





import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { useSearchParams } from "react-router-dom";

const browserRadioApi = new RadioBrowserApi("My Radio App");

const useRadio = ({ country, limit = 4 }) => {
  const [params] = useSearchParams();
  const genre = params.get("genre") ? [params.get("genre")] : [];

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const [error, setError] = useState(null); // Initialize error state as null

  const setupApi = async () => {
    try {
      const radioStations = await browserRadioApi.searchStations({
        country: country,
        tagList: genre,
        limit: limit,
      });
      return radioStations;
    } catch (err) {
      setError(err.message || "An error occurred"); // Capture and set the error
      return [];
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true at the start of the effect
    setupApi().then((data) => {
      setStations(data);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, [country, params]);

  return { stations, loading, error };
};

export default useRadio;







// SESSION STORAGE

// import { useEffect, useState } from "react";
// import { RadioBrowserApi } from "radio-browser-api";
// import { useSearchParams } from "react-router-dom";

// const browserRadioApi = new RadioBrowserApi("My Radio App");

// const useRadio = ({ country, limit = 4 }) => {
//   const [params] = useSearchParams();
//   const genre = params.get("genre") ? [params.get("genre")] : [];

//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true); // Initialize loading state as true
//   const [error, setError] = useState(null); // Initialize error state as null

//   const storageKey = `stations-${country}-${genre.join(",")}`;

//   const fetchStationsFromApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });
//       sessionStorage.setItem(storageKey, JSON.stringify(radioStations));
//       return radioStations;
//     } catch (err) {
//       setError(err.message || "An error occurred"); // Capture and set the error
//       return [];
//     }
//   };

//   useEffect(() => {
//     setLoading(true); // Set loading to true at the start of the effect

//     // First, check sessionStorage
//     const cachedStations = sessionStorage.getItem(storageKey);
//     if (cachedStations) {
//       setStations(JSON.parse(cachedStations));
//       setLoading(false);
//     } else {
//       fetchStationsFromApi().then((data) => {
//         setStations(data);
//         setLoading(false); // Set loading to false once data is fetched
//       });
//     }
//   }, [country, params]);

//   return { stations, loading, error };
// };

// export default useRadio;




// ORIGIN useRadioo


// import { useEffect, useState } from "react";
// import { RadioBrowserApi } from "radio-browser-api";

// import { useSearchParams } from "react-router-dom";

// const browserRadioApi = new RadioBrowserApi("My Radio App");

// const useRadio = ({ country, limit = 4}) => {
//   const [params] = useSearchParams();

//   const genre = params.get("genre") ? [params.get("genre")] : [];

//   const [stations, setStations] = useState([]);
//   const setupApi = async () => {
//     const radioStations = await browserRadioApi
//       .searchStations({
//         country: country,
//         tagList: genre,

//         limit: limit,
//       })
//       .then((data) => {
//         return data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     return radioStations;
//   };

//   useEffect(() => {
//     setupApi().then((data) => {
//       setStations(data);
//       // console.log(data);
//     });
//   }, [country, params]);

//   return stations;
// };

// export default useRadio;
