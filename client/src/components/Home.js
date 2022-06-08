import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import ReactAudioPlayer from "react-audio-player";
import useRadio from "../hooks/useRadio";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  // const {user} = useAuth0()
  // console.log(user);
  const stations = useRadio({ country: "Canada", limit: 5 });

  console.log(stations);

  if (stations) {
    return (
      <>
        <div>Radio</div>

        <div>
          {stations.map((item) => {
            return (
              <div key={item.id}>
                {/* <ReactAudioPlayer
                  src={item.urlResolved}
                  style={{ width: "220px", border: "none" }}
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
