// import { RadioContainer, RadioList } from "./styles";
import Radio from "./Radio";
import { useAudio } from "./AudioContext";
import { RadioContainer, RadioList } from "./styles";
import styled from "styled-components";
import { useEffect } from "react";

const PlayList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { recentPlays, clearRecentPlays, removeRecentPlay } = useAudio();

  return (
    <div>
      {recentPlays && recentPlays.length > 0 ? (
        <RadioContainer>
          <YourPlays>Recent plays:</YourPlays>

          {/* <hr style={{ backgroundColor: "white" }} /> */}
          <ClearAll title="Clear list" onClick={clearRecentPlays}>
            Clear All
          </ClearAll>
          <RadioList>
            {recentPlays &&
              recentPlays.map((play) => (
                <Radio
                  item={play}
                  key={play.url}
                  isRecentPlay={true}
                  onRemove={() => removeRecentPlay(play.url)}
                />
              ))}
          </RadioList>
        </RadioContainer>
      ) : (
        <RadioContainer>
          <YourPlays>Recent plays:</YourPlays>
          <hr style={{ backgroundColor: "white" }} />{" "}
          <NoRecentPlaysDiv>
            No recent plays available. Please select and play stations to
            generate your list!
          </NoRecentPlaysDiv>
        </RadioContainer>
      )}
    </div>
  );
};

const ClearAll = styled.button`
  background-color: black;
  color: white;
  border: 1px solid white;
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.75);
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (min-width: 1025px) {
    :hover {
      /* text-decoration-line: underline; */
      color: grey;
    }
  }
`;

const YourPlays = styled.h2`
  font-size: 1.6em;

  @media (max-width: 880px) {
    font-size: 1.8em;
  }

  @media (max-width: 680px) {
    padding-top: 10px;
    font-size: 1.4em;
  }

  @media (min-width: 1024px) {
    margin-block-start: 10px;
  }
`;

const NoRecentPlaysDiv = styled.div`
  text-align: center;
  padding-top: 10%;
  font-size: 1.2em;

  @media (max-width: 680px) {
    font-size: 1.1em;
  }
`;

export default PlayList;
