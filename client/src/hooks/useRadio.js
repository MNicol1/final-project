// Current Cache solution

import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";

const stationsCache = {}; // Cache object to store stations data
const cacheDuration = 12 * 60 * 60 * 1000;

const browserRadioApi = new RadioBrowserApi("My Radio App");
browserRadioApi.setBaseUrl("https://at1.api.radio-browser.info");

const useRadio = ({ country, limit = 8 }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch and filter stations data
  const fetchStationsForCountry = async (country) => {
    try {
      const radioStations = await browserRadioApi.searchStations({
        country: country,
        limit: limit,
      });

      // Filter out duplicate URLs and names
      const uniqueUrlMap = new Map();
      const uniqueNameMap = new Map();

      radioStations.forEach((station) => {
        if (!uniqueUrlMap.has(station.urlResolved)) {
          uniqueUrlMap.set(station.urlResolved, station);
          const trimmedLowerName = station.name.trim().toLowerCase();
          if (trimmedLowerName && !uniqueNameMap.has(trimmedLowerName)) {
            uniqueNameMap.set(trimmedLowerName, station);
          }
        }
      });

      return Array.from(uniqueNameMap.values());
    } catch (err) {
      throw new Error(
        err.message || "An error occurred while fetching stations"
      );
    }
  };

  const isCacheValid = (cacheEntry) => {
    return cacheEntry && Date.now() - cacheEntry.timestamp < cacheDuration;
  };

  useEffect(() => {
    setLoading(true);
    const cachedData = stationsCache[country];

    if (isCacheValid(cachedData)) {
      // Use cached data if it's still valid
      setStations(cachedData.data);
      setLoading(false);
    } else {
      // Fetch new data if cache is invalid or does not exist
      fetchStationsForCountry(country)
        .then((fetchedStations) => {
          stationsCache[country] = {
            data: fetchedStations,
            timestamp: Date.now(),
          };
          setStations(fetchedStations);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [country]);

  return { stations, loading, error };
};
export default useRadio;

// Context API

// import { useEffect, useState } from "react";
// import { RadioBrowserApi } from "radio-browser-api";
// import { useSearchParams } from "react-router-dom";
// import { useStations } from '../components/StationsContext'; // Adjust the import path as necessary

// const browserRadioApi = new RadioBrowserApi("My Radio App");
// browserRadioApi.setBaseUrl("https://at1.api.radio-browser.info");

// const useRadio = ({ country, limit = 8 }) => {
//   const [params] = useSearchParams();
//   const genre = params.get("genre") ? [params.get("genre")] : [];

//   const { stationsData, updateStationsData } = useStations();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const setupApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });

//       // Filter out duplicate URLs
//       const uniqueUrlMap = new Map();
//       radioStations.forEach(station => {
//         if (!uniqueUrlMap.has(station.urlResolved)) {
//           uniqueUrlMap.set(station.urlResolved, station);
//         }
//       });
//       const uniqueUrlStations = Array.from(uniqueUrlMap.values());

//       // Filter out duplicate names
//       const uniqueNameMap = new Map();
//       uniqueUrlStations.forEach(station => {
//         const trimmedLowerName = station.name.trim().toLowerCase();
//         if (trimmedLowerName && !uniqueNameMap.has(trimmedLowerName)) {
//           uniqueNameMap.set(trimmedLowerName, station);
//         }
//       });
//       return Array.from(uniqueNameMap.values());
//     } catch (err) {
//       setError(err.message || "An error occurred");
//       return [];
//     }
//   };

//   useEffect(() => {
//     if (stationsData[country]) {
//       setLoading(false);
//     } else {
//       setLoading(true);
//       setupApi().then((data) => {
//         updateStationsData(country, data);
//         setLoading(false);
//       }).catch((err) => {
//         setError(err.message || "An error occurred");
//         setLoading(false);
//       });
//     }
//   }, [country, stationsData, updateStationsData]);

//   return { stations: stationsData[country] || [], loading, error };
// };

// export default useRadio;

// filtering of duplicate station name and url version

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
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const setupApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });

//       // Filter out HTTP stations
//       const httpsOnlyStations = radioStations.filter(
//         (station) =>
//           station.urlResolved.startsWith("https://") &&
//           station.name &&
//           station.name.trim() !== ""
//       );

//       // First, filter out duplicate URLs
//       const uniqueUrlMap = new Map();
//       httpsOnlyStations.forEach(station => {
//         if (!uniqueUrlMap.has(station.urlResolved)) {
//           uniqueUrlMap.set(station.urlResolved, station);
//         }
//       });
//       const uniqueUrlStations = Array.from(uniqueUrlMap.values());

//       // Then, filter out duplicate names from the list of stations with unique URLs
//       const uniqueNameMap = new Map();
//       uniqueUrlStations.forEach(station => {
//         const trimmedLowerName = station.name.trim().toLowerCase(); // Trim and convert to lowercase

//         if (trimmedLowerName && !uniqueNameMap.has(trimmedLowerName)) {
//           uniqueNameMap.set(trimmedLowerName, station); // Use the lowercase, trimmed name as the key
//         }
//       });
//       const uniqueStations = Array.from(uniqueNameMap.values());

//       return uniqueStations;
//     } catch (err) {
//       setError(err.message || "An error occurred");
//       return [];
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     setupApi().then((data) => {
//       setStations(data);
//       setLoading(false);
//     });
//   }, [country, params]);

//   return { stations, loading, error };
// };

// export default useRadio;

// DON"T FILER HTTP WITH CACHE - for country fetch  with CACHE INVALIDATION  TIMESTAMP

// import { useEffect, useState } from "react";
// import { RadioBrowserApi } from "radio-browser-api";
// import { useSearchParams } from "react-router-dom";
// import radioDataCache from "../components/radioDataCache";

// const browserRadioApi = new RadioBrowserApi("My Radio App");

// //added baseurl

// browserRadioApi.setBaseUrl("https://at1.api.radio-browser.info");

// const cacheDuration = 12 * 60 * 60 * 1000;

// const useRadio = ({ country, limit = 8 }) => {
//   const [params] = useSearchParams();
//   const genre = params.get("genre") ? [params.get("genre")] : [];

//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const setupApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });

//       // Filter out duplicate URLs
//       const uniqueUrlMap = new Map();
//       radioStations.forEach((station) => {
//         if (!uniqueUrlMap.has(station.urlResolved)) {
//           uniqueUrlMap.set(station.urlResolved, station);
//         }
//       });
//       const uniqueUrlStations = Array.from(uniqueUrlMap.values());

//       // Filter out duplicate names

//       // Filter out duplicate names and ignore empty or whitespace-only names
//       const uniqueNameMap = new Map();
//       uniqueUrlStations.forEach((station) => {
//         // Convert station name to lowercase for case-insensitive comparison
//         const stationNameLower = station.name.trim().toLowerCase();

//         // Check if the lowercase station name is not empty and not already in the map
//         if (stationNameLower && !uniqueNameMap.has(stationNameLower)) {
//           uniqueNameMap.set(stationNameLower, station);
//         }
//       });
//       const uniqueStations = Array.from(uniqueNameMap.values());

//       return uniqueStations;
//     } catch (err) {
//       setError(err.message || "An error occurred");
//       return [];
//     }
//   };

//   useEffect(() => {
//     const currentTime = new Date().getTime();
//     const cachedData = radioDataCache[country];

//     if (cachedData && currentTime - cachedData.timestamp < cacheDuration) {
//       // Use cached data if within validity period
//       setStations(cachedData.stations);
//       setLoading(false);
//     } else {
//       // Fetch new data
//       setLoading(true);
//       setupApi()
//         .then((data) => {
//           radioDataCache[country] = { stations: data, timestamp: currentTime };
//           setStations(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           // ... error handling ...
//         });
//     }
//   }, [country, params]);

//   return { stations, loading, error };
// };

// export default useRadio;

// DONt FILTER HTTP VERSION :

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
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const setupApi = async () => {
//     try {
//       const radioStations = await browserRadioApi.searchStations({
//         country: country,
//         tagList: genre,
//         limit: limit,
//       });

//       // Filter out duplicate URLs
//       const uniqueUrlMap = new Map();
//       radioStations.forEach((station) => {
//         if (!uniqueUrlMap.has(station.urlResolved)) {
//           uniqueUrlMap.set(station.urlResolved, station);
//         }
//       });
//       const uniqueUrlStations = Array.from(uniqueUrlMap.values());

//       // Filter out duplicate names

//       // Filter out duplicate names and ignore empty or whitespace-only names
//       const uniqueNameMap = new Map();
//       uniqueUrlStations.forEach((station) => {
//         // Convert station name to lowercase for case-insensitive comparison
//         const stationNameLower = station.name.trim().toLowerCase();

//         // Check if the lowercase station name is not empty and not already in the map
//         if (stationNameLower && !uniqueNameMap.has(stationNameLower)) {
//           uniqueNameMap.set(stationNameLower, station);
//         }
//       });
//       const uniqueStations = Array.from(uniqueNameMap.values());

//       return uniqueStations;
//     } catch (err) {
//       setError(err.message || "An error occurred");
//       return [];
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     setupApi().then((data) => {
//       setStations(data);
//       setLoading(false);
//     });
//   }, [country, params]);

//   return { stations, loading, error };
// };

// export default useRadio;

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
