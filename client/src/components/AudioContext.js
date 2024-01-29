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
    const saved = sessionStorage.getItem("recentPlays");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const playAudio = (url, item) => {
    setCurrentlyPlayingURL(url);
    setIsPlaying(true);
    setIsLoading(true);
    setIsAudioFooterVisible(true);

    const audioElement = document.createElement("audio");
    audioElement.src = url;

    if (audioElement.src !== url) {
      audioElement.src = url;
      audioElement.load(); // Load the new source
    }

    audioElement.oncanplay = () => {
      //this prevents station from going to recentplays lists if favorite list and add this to if statement below :  !isFavorite &&
      // const isFavorite = favorites.some(fav => fav.urlResolved === item.urlResolved);

      // update recentPlays
      if (item && item.urlResolved) {
        setRecentPlays((prevPlays) => {
          const updatedPlays = prevPlays.filter(
            (play) => play.url !== item.urlResolved
          );
          const newPlay = {
            url: item.urlResolved,
            urlResolved: item.urlResolved,
            name: item.name,
            country: item.country,
            state: item.state,
            geoLat: item.geoLat,
            geoLong: item.geoLong,
          };
          return [newPlay, ...updatedPlays];
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
    sessionStorage.setItem("recentPlays", JSON.stringify(recentPlays));
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

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (fav) => fav.urlResolved === item.urlResolved
      );
      if (!exists) {
        const newItem = {
          ...item,
          url: item.urlResolved, // Ensure the key is based on urlResolved
          // Copy other necessary properties from item
        };
        return [newItem, ...prevFavorites];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (urlToRemove) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.url !== urlToRemove)
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
