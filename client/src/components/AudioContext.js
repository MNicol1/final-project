import { createContext, useState, useContext, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  // const [currentURL, setCurrentURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentlyPlayingURL, setCurrentlyPlayingURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentItem, setCurrentItem] = useState(null);

  const [isAudioFooterVisible, setIsAudioFooterVisible] = useState(false);

  const [sourceError, setSourceError] = useState(null);

  const [recentPlays, setRecentPlays] = useState(() => {
    // Load initial state from sessionStorage or localStorage
    const saved = localStorage.getItem("recentPlays");
    return saved ? JSON.parse(saved) : [];
  });

  const playAudio = (url, item) => {
    setCurrentlyPlayingURL(url);
    setIsPlaying(true);
    setIsLoading(true);
    setIsAudioFooterVisible(true);

    const audioElement = document.createElement("audio");
    audioElement.src = url;

    audioElement.oncanplay = () => {
      // Audio is playable; update recentPlays
      if (item && item.urlResolved) {
        setRecentPlays((prevPlays) => {
          const existingPlayIndex = prevPlays.findIndex(
            (play) => play.url === item.urlResolved
          );

          if (existingPlayIndex === -1) {
            const newPlay = {
              url: item.urlResolved,
              urlResolved: item.urlResolved,
              name: item.name,
              country: item.country,
              state: item.state,
              geoLat: item.geoLat,
              geoLong: item.geoLong,
            };
            return [newPlay, ...prevPlays];
          } else {
            const updatedPlays = [...prevPlays];
            const [existingPlay] = updatedPlays.splice(existingPlayIndex, 1);
            updatedPlays.unshift(existingPlay);
            return updatedPlays;
          }
        });
      }
    };

    audioElement.onerror = () => {
      // Error in playing the audio; don't update recentPlays
      console.warn("Playback error for URL:", url);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audioElement.load(); // Load the audio to trigger events
  };

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    // Save recent plays to sessionStorage
    localStorage.setItem("recentPlays", JSON.stringify(recentPlays));
  }, [recentPlays]);

  const clearRecentPlays = () => {
    setRecentPlays([]);
    sessionStorage.removeItem("recentPlays");
  };

  const removeRecentPlay = (urlToRemove) => {
    setRecentPlays((prevPlays) =>
      prevPlays.filter((play) => play.url !== urlToRemove)
    );
    // Update sessionStorage in useEffect or here directly
  };

  return (
    <AudioContext.Provider
      value={{
        currentURL: currentlyPlayingURL,
        isPlaying,
        setIsPlaying,
        playAudio,
        pauseAudio,
        isLoading,
        setIsLoading,
        currentItem,
        setCurrentItem,
        isAudioFooterVisible,
        setIsAudioFooterVisible,
        sourceError,
        setSourceError,
        recentPlays,
        setRecentPlays,
        clearRecentPlays,
        removeRecentPlay,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
