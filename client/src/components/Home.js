import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import ReactAudioPlayer from "react-audio-player";
import useRadio from "../hooks/useRadio";

//stationFilter is passed in tag: and in ( ) below
// const setupApi = async () => {
//   const api = new RadioBrowserApi("My Radio App");

//   const radioStations = await api
//     .searchStations({
//       language: "english",
//       country: "Canada",
//       tag: "classical",

//       limit: 5,
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return radioStations;
// };

const Home = () => {
  // const [stations, setStations] = useState();
//   const [stationFilter, setStationFilter] = useState("classical");

const stations = useRadio({country: "Canada", limit: 20});

//add stationFilter in setupApi(stationFilter) and in dep array : }, [stationFilter]);

// useEffect(() => {
//           setupApi().then((data) => {
//             setStations(data);
//             // console.log(data);
//           });
//         }, []);



//   const filters = [
//     "all",
//     "classical",
//     "country",
//     "dance",
//     "disco",
//     "house",
//     "jazz",
//     "pop",
//     "rap",
//     "retro",
//     "rock",
//   ];

  console.log(stations);

  if (stations) {
    return (
      <>
        <div>Radio</div>
        {/* {filters.map((filter, index) => (
          <button
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </button>
        ))} */}

        <div>
          {stations.map((item) => {
            return (
              <div>
                {/* <ReactAudioPlayer
                  src={item.urlResolved}
                  style={{ width: "200px", border: "none" }}
                  controls
                /> */}

                <div>{item.name}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Home;
