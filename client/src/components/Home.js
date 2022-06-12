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

  // console.log(stations);

  if (stations) {
    return (
      <>
        <RadioContainer>
          <RadioList>
            {stations.map((item) => {
              return <Radio item={item} key={item.id} />;
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
