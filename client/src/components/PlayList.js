import Radio from "./Radio";
import { useAudio } from "./AudioContext";
import { RadioContainer, RadioList } from "./styles";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PlayList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //from context
  const {
    recentPlays,
    clearRecentPlays,
    removeFromFavorites,
    favorites,
    clearFavorites,
  } = useAudio();

  
  const [activeTab, setActiveTab] = useState("favorites"); 

  const renderList = (plays, isFavoriteList, addToFavorites) => (
    <RadioList>
      {plays.map((play) => (
        <Radio
          item={play}
          key={play.url}
          isInFavoritesList={isFavoriteList} // true for items in Favorites, false for Recent Plays
          onRemove={() => removeFromFavorites(play.url)}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      ))}
    </RadioList>
  );

  return (
    <>
      <RadioContainer>
        <TabContainer>
          <YourPlays
            onClick={() => setActiveTab("favorites")}
            active={activeTab === "favorites"}
            title="Favorites"
          >
            Favorites
          </YourPlays>
          <YourPlays
            onClick={() => setActiveTab("recentPlays")}
            active={activeTab === "recentPlays"}
            title="Play History"
          >
            Play History
          </YourPlays>
        </TabContainer>

        {activeTab === "favorites" && (
          <>
            <ClearAll title="Clear list" onClick={clearFavorites}>
              Clear All
            </ClearAll>
            {favorites.length > 0 ? (
              renderList(favorites, true)
            ) : (
              <NoRecentPlaysDiv>
                No favorites added. Click on the 'add to list' icon to mark your
                favorites!
              </NoRecentPlaysDiv>
            )}
          </>
        )}

        {activeTab === "recentPlays" && (
          <>
            <ClearAll title="Clear list" onClick={clearRecentPlays}>
              Clear List
            </ClearAll>
            {recentPlays.length > 0 ? (
              renderList(recentPlays, false)
            ) : (
              <NoRecentPlaysDiv>
                No recent history available. Once stations are played a list
                will be created, with the most recently played station at the
                top.
              </NoRecentPlaysDiv>
            )}
          </>
        )}
      </RadioContainer>
    </>
  );
};

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 680px) {
    padding: 35px 0;
  }
`;

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
      color: grey;
    }
  }
`;

const YourPlays = styled.h2`
  position: relative;
  padding: 10px 15px;
  font-size: 1.6em;
  cursor: pointer;
  color: ${(props) => (props.active ? "white" : "rgb(132, 132, 132)")};
  border-top: ${(props) => (props.active ? "1.5px solid #ccc" : "none")};
  border-left: ${(props) =>
    props.active && props.title === "Play History"
      ? "1.5px solid #ccc"
      : "none"};
  border-right: ${(props) =>
    props.active && props.title === "Favorites" ? "1.5px solid #ccc" : "none"};
  /* border-top-left-radius: 6px; 
  border-top-right-radius: 6px;  */

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    height: 1px;
    border-bottom: 1.5px solid white; // Apply dashed border
    display: ${(props) => (props.active ? "block" : "none")};
  }

  &[title="Favorites"]::after {
    left: 100%;
    width: 80vw;
  }

  &[title="Play History"]::after {
    right: 100%;
    width: 165px;
  }

  @media (max-width: 680px) {
    &[title="Favorites"]::after {
      left: 100%;
      width: 50vw;
    }
    &[title="Play History"]::after {
      right: 100%;
      width: 80%;
    }
  }

  @media (min-width: 1025px) {
    :hover {
      color: #f8d6fe;
    }
  }

  @media (max-width: 880px) {
    font-size: 1.8em;
  }

  @media (max-width: 680px) {
    padding-top: 5px 1px;
    font-size: 1.1em;
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
