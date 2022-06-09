import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import useRadio from "../hooks/useRadio";
import { useAuth0 } from "@auth0/auth0-react";
// import {BsMusicNoteList, AiOutlineLike} from "react-icons"

const Home = () => {
  const {isAuthenticated} = useAuth0()
  // console.log(user);
  const stations = useRadio({ country: "Canada", limit: 5 });
  const [isLiked, setIsLiked] = useState(false);



  const handleLike = (id) => {
    console.log("test");
    fetch("/post-liked-stations", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setIsLiked(!isLiked);
        }
      });
  };

  // console.log(stations);

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

                <button
                  onClick={() => {handleLike(item.id)}}
                  disabled={isAuthenticated}
                >
                  like
                </button>
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
