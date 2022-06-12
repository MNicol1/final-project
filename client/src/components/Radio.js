import { BsMusicNoteList, AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GoRadioTower } from "react-icons/go";
import { GiMusicalNotes } from "react-icons/gi";
import { ImEarth } from "react-icons/im";

const Radio = ({ item }) => {
  const { isAuthenticated, user } = useAuth0();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (id) => {
    console.log("test");
    fetch("/post-liked-stations", {
      method: "POST",
      body: JSON.stringify({ id, email: user.email }),
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
      <div>
        <GoRadioTower size={20} color="" /> {item.name}
      </div>
      <hr/>
      <CountryName>{item.country} <State>{item.state}</State></CountryName>

      <ReactAudioPlayer
        src={item.urlResolved}
        style={{ width: "220px", border: "none", color: "white" }}
        controls
      />
      <Likes>
      <LikeButton
        onClick={() => {
          handleLike(item.id);
        }}
        disabled={!isAuthenticated}
      >
        <AiOutlineLike size={22} />
      </LikeButton>
      </Likes>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  padding: 20px;
  /* max-width: 1200px; */
`;

const CountryName = styled.div`
margin: 10px 0px;
`

const State = styled.span`
font-size: 0.8em;
font-style: italic;
`

const Likes = styled.div`
padding: 5px;
`
const LikeButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  :disabled {
    cursor: none;
    /* background-color: red; */
  }
`;

export default Radio;
