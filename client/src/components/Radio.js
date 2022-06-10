import {BsMusicNoteList, AiOutlineLike} from "react-icons/ai"
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Radio = ({ item }) => {

  // const { isAuthenticated } = useAuth0();
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

  return (
    <Container>
      <div>{item.name}</div>
      <div>{item.country}</div>

      <ReactAudioPlayer
        src={item.urlResolved}
        style={{ width: "220px", border: "none" }}
        controls
      />
      <LikeButton
        onClick={() => {
          handleLike(item.id);
        }}
        // disabled={isAuthenticated}
      >
        <AiOutlineLike size={22}/>
      </LikeButton>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  max-width: 1200px;
`;

const LikeButton = styled.button`
background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

`

export default Radio;
