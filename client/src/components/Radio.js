import { AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GoRadioTower } from "react-icons/go";
import "./Radio.css";

const Radio = ({ item }) => {
  const { isAuthenticated, user } = useAuth0();
  const [isLiked, setIsLiked] = useState(false);

  const [numLikes, setNumLikes] = useState(0);

  // get number of likes here - create a fetch (useEffect is recommended) who sole purpose is to return numLikes find with item.id  station ...

  // console.log(item);

  //  here create a endpoint for remove / unlike  ;
  const handleUnlike = (id) => {



  };

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
        // console.log(data);
        if (data.status === 200) {
          setIsLiked(!isLiked);
          setNumLikes(data.numLikes);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // console.log("fetching liked stations");
    fetch(`/get-liked-stations/${item.id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.stations) {
          setNumLikes(data.stations.numLikes);
          if (user) {
            // console.log(user.email);
            // console.log(data.stations.users);
            setIsLiked(data.stations.users.includes(user.email));
          } else {
            setIsLiked(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <Container>
      <StationName>
        <GoRadioTower size={20} color="" /> {item.name}
      </StationName>
      <hr />
      <CountryName>
        {item.country} <State>{item.state}</State>
      </CountryName>
      {/* <div>{item.tags}</div> */}
      <Audio>
        {/* <ReactAudioPlayer
      class="audio"
        src={item.urlResolved}
        style={{ width: "220px"}}
        controls controlsList="nodownload noplaybackrate"
      /> */}
      </Audio>
      <Likes>
        <LikeButton
          onClick={() => {
            if (isLiked) {
              handleUnlike(item.id);
            } else {
              handleLike(item.id);
            }
          }}
          disabled={!isAuthenticated}
          isLiked={isLiked}
        >
          <AiOutlineLike size={24} />
        </LikeButton>
        <span> {numLikes}</span>
      </Likes>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  padding: 20px 20px;
  /* max-width: 1200px; */
  /* position: relative; */
  /* transition: 400ms linear; 
  :hover {
    transform: scale(1.1);
  } */
`;

const StationName = styled.div`
  height: 52px;
`;
const CountryName = styled.div`
  margin: 10px 0px;
  height: 30px;
`;

const State = styled.span`
  font-size: 0.8em;
  font-style: italic;
`;

const Likes = styled.div`
  padding: 5px;
  margin-top: 30px;
`;

const Audio = styled.div`
  margin-top: 20px;
`;
const LikeButton = styled.button`
  background: none;

  color: ${(p) => (p.isLiked ? "blue" : "inherit")};

  border: none;
  padding-right: 2px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  :disabled {
    cursor: not-allowed;
    /* background-color: red; */
  }
`;

export default Radio;
