import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";

import { GoRadioTower } from "react-icons/go";
import "./Radio.css";

const Radio = ({ item }) => {
  return (
    <Container>
      <StationName>
        <GoRadioTower size={20} /> {item.name}
      </StationName>

      <hr />
      <CountryName>
        {item.country} <State>{item.state}</State>
      </CountryName>

      <Audio>
        <ReactAudioPlayer
          class="audio"
          src={item.urlResolved}
          style={{ width: "220px" }}
          controls
          controlsList="nodownload noplaybackrate"
        />
      </Audio>
      {/* <Likes>
        <LikeButton
          playingAnimation={playingAnimation}
          onAnimationEnd={() => {
            setPlayingAnimation(false);
          }}
          onClick={() => {
            setPlayingAnimation(true);

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
      </Likes> */}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid white;
  padding: 20px 25px;
  transition: 400ms linear;

  :hover {
    transform: scale(1.1);
    border: 2px solid #f8d6fe;
    border-radius: 5%;
  }

  @media (max-width: 650px) {
    transition: none;
    :hover {
      transform: none;
      border-radius: 0%;
      border: 1px solid white;
    }
  }

  /* @media (max-width: 380px) {
    padding: 20px 30px;
  } */
`;

const StationName = styled.div`
  height: 110px;
  width: 220px;
`;
const CountryName = styled.div`
  margin: 10px 0px;
  height: 40px;
`;

const State = styled.span`
  font-size: 0.8em;
  font-style: italic;
  color: #f8d6fe;
`;

// const Likes = styled.div`
//   padding: 5px;
//   margin-top: 30px;
// `;

const Audio = styled.div`
  margin-top: 20px;
`;
// const LikeButton = styled.button`
//   background: none;

//   color: ${(p) => (p.isLiked ? "gold" : "inherit")};

//   border: none;
//   padding-right: 2px;
//   font: inherit;
//   cursor: pointer;
//   outline: inherit;
//   :disabled {
//     cursor: not-allowed;
//   }

//   @keyframes clickLike {
//     0% {
//       transform: translate(0);
//     }
//     50% {
//       transform: translate(0, -15px);
//     }
//     100% {
//       transform: translate(0);
//     }
//   }

//   animation-duration: .5s;
//   animation-timing-function: ease-out;

//   animation-name: ${(p) => (p.playingAnimation ? "clickLike" : "")};
// `;

export default Radio;
