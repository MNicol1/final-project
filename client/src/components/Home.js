import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import useRadio from "../hooks/useRadio";
import { useAuth0 } from "@auth0/auth0-react";
// import {BsMusicNoteList, AiOutlineLike} from "react-icons"
import styled from "styled-components";

import { RadioContainer, RadioList } from "./styles";
import Radio from "./Radio";

const Home = () => {
  // const { isAuthenticated } = useAuth0();

  const stations = useRadio({ country: "Canada", limit: 5 });
  // const [isLiked, setIsLiked] = useState(false);

  // const handleLike = (id) => {
  //   // console.log("test");
  //   fetch("/post-liked-stations", {
  //     method: "POST",
  //     body: JSON.stringify({ id }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         setIsLiked(!isLiked);
  //       }
  //     });
  // };

  // console.log(stations);

  if (stations) {
    return (
      <>
        <div>HOME</div>

        <RadioContainer>
          <RadioList>
            {stations.map((item) => {
              return (
                <Radio item={item}
                key={item.id}/>
                // <div key={item.id}>
                //   <ReactAudioPlayer
                //     src={item.urlResolved}
                //     style={{ width: "220px", border: "none" }}
                //     controls
                //   />

                //   <div>{item.name}</div>

                //   <button
                //     onClick={() => {
                //       handleLike(item.id);
                //     }}
                //     disabled={isAuthenticated}
                //   >
                //     like
                //   </button>
                // </div>
              );
            })}
          </RadioList>
        </RadioContainer>
      </>
    );
  } else {
    return null;
  }
};

export default Home;
