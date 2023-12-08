//filtering of duplicate station name and url version

import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import { useSearchParams } from "react-router-dom";

const browserRadioApi = new RadioBrowserApi("My Radio App");

//added baseurl

browserRadioApi.setBaseUrl("https://at1.api.radio-browser.info");

const useRadio = ({ country, limit = 8 }) => {
  const [params] = useSearchParams();
  const genre = params.get("genre") ? [params.get("genre")] : [];

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setupApi = async () => {
    try {
      const radioStations = await browserRadioApi.searchStations({
        country: country,
        tagList: genre,
        limit: limit,
      });

      // Filter out HTTP stations
      const httpsOnlyStations = radioStations.filter(
        (station) =>
          station.urlResolved.startsWith("https://") &&
          station.name &&
          station.name.trim() !== ""
      );

      // First, filter out duplicate URLs
      const uniqueUrlStations = httpsOnlyStations.filter(
        (station, index, self) =>
          index === self.findIndex((s) => s.urlResolved === station.urlResolved)
      );

      // Then, filter out duplicate names from the list of stations with unique URLs
      const uniqueStations = uniqueUrlStations.filter(
        (station, index, self) =>
          index === self.findIndex((s) => s.name === station.name)
      );

      return uniqueStations;
    } catch (err) {
      setError(err.message || "An error occurred");
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);
    setupApi().then((data) => {
      setStations(data);
      setLoading(false);
    });
  }, [country, params]);

  return { stations, loading, error };
};

export default useRadio;

// // JUSt https filtered Version

// import { useEffect, useState } from "react";
// import { RadioBrowserApi } from "radio-browser-api";
// import { useSearchParams } from "react-router-dom";

// const browserRadioApi = new RadioBrowserApi("My Radio App");

// //added baseurl

// browserRadioApi.setBaseUrl("https://at1.api.radio-browser.info");

// const useRadio = ({ country, limit = 8 }) => {
//   const [params] = useSearchParams();
//   const genre = params.get("genre") ? [params.get("genre")] : [];

//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true); // Initialize loading state as true
//   const [error, setError] = useState(null); // Initialize error state as null

//   const setupApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });

//       // Filter out HTTP stations
//       const httpsOnlyStations = radioStations.filter((station) =>
//       station.urlResolved.startsWith("https://") && station.name && station.name.trim() !== ""
//     );

//       return httpsOnlyStations;
//     } catch (err) {
//       setError(err.message || "An error occurred");
//       return [];
//     }
//   };

//   useEffect(() => {
//     setLoading(true); // Set loading to true at the start of the effect
//     setupApi().then((data) => {
//       setStations(data);
//       setLoading(false); // Set loading to false once data is fetched
//     });
//   }, [country, params]);

//   return { stations, loading, error };
// };

// export default useRadio;

// V2

// import { useEffect, useState } from "react";
// import { RadioBrowserApi } from "radio-browser-api";
// import { useSearchParams } from "react-router-dom";

// const browserRadioApi = new RadioBrowserApi("My Radio App");

// //added baseurl

// browserRadioApi.setBaseUrl("https://at1.api.radio-browser.info");

// const useRadio = ({ country, limit = 4 }) => {
//   const [params] = useSearchParams();
//   const genre = params.get("genre") ? [params.get("genre")] : [];

//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true); // Initialize loading state as true
//   const [error, setError] = useState(null); // Initialize error state as null

//   const setupApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });
//       return radioStations;
//     } catch (err) {
//       setError(err.message || "An error occurred"); // Capture and set the error
//       return [];
//     }
//   };

//   useEffect(() => {
//     setLoading(true); // Set loading to true at the start of the effect
//     setupApi().then((data) => {
//       setStations(data);
//       setLoading(false); // Set loading to false once data is fetched
//     });
//   }, [country, params]);

//   return { stations, loading, error };
// };

// export default useRadio;

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
