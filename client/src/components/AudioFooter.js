import { useState, useRef, useEffect } from "react";

import { useAudio } from "./AudioContext";
import "./AudioFooter.css";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

import { RiStopFill, RiPlayFill } from "react-icons/ri";

const AudioFooter = () => {
  const {
    currentURL,
    isPlaying,
    setIsLoading,
    isLoading,
    setIsPlaying,
    pauseAudio,
    playAudio,
    currentItem,
    setSourceError,
    sourceError,
    isAudioFooterVisible,
  } = useAudio();

  const audioRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // 0.5 as a default value for volume (50%)

  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const [isVolumeHovered, setIsVolumeHovered] = useState(false);


  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }, []);

  const handleVolumeEnter = () => {
    if (!isTouchDevice) {
      setIsVolumeHovered(true);
    }
  };

  const handleVolumeLeave = () => {
    if (!isTouchDevice) {
      setIsVolumeHovered(false);
    }
  };

  useEffect(() => {
    if (isPlaying && currentURL) {
      audioRef.current.src = currentURL; // Set the source to reload the stream
      audioRef.current.play().catch((error) => {
        console.warn("Play was interrupted:", error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentURL]);

  useEffect(() => {
    // Assuming the initial volume is stored in the state `volume`
    // Adjust this logic if the volume is stored or retrieved differently
    const initialFillPercentage = `${volume * 100}%`;
    if (sliderRef.current) {
      sliderRef.current.style.setProperty(
        "--fill-percentage",
        initialFillPercentage
      );
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        updateVolume(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const updateVolume = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let newVolume = (rect.height - y) / rect.height;
    newVolume = Math.max(0, Math.min(newVolume, 1)); // Clamp between 0 and 1

    setVolume(newVolume);
    audioRef.current.volume = newVolume;

    const fillPercentage = `${newVolume * 100}%`;
    sliderRef.current.style.setProperty("--fill-percentage", fillPercentage);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      // If there is a current URL and currentItem, play it
      if (currentURL && currentItem) {
        playAudio(currentURL, currentItem);
      }
    }
  };

  const renderAudioControl = () => {
    if (isLoading) {
      return <ImSpinner2 className="spin-icon" />;
    } else if (isPlaying) {
      return <RiStopFill />;
    } else {
      return <RiPlayFill />;
    }
  };

  const [displayedItem, setDisplayedItem] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setDisplayedItem(currentItem);
    }
  }, [isLoading, currentItem]);

  //Disabled this Volume slider click functionality for better UX

  // const handleSliderClick = (e) => {
  //   const rect = e.target.getBoundingClientRect();
  //   const y = e.clientY - rect.top; // y position within the element.
  //   const volumeLevel = 1 - y / rect.height;
  //   audioRef.current.volume = volumeLevel;
  //   setVolume(volumeLevel);

  //   // Update the slider fill
  //   const fillPercentage = `${volumeLevel * 100}%`;
  //   sliderRef.current.style.setProperty("--fill-percentage", fillPercentage);

  //   // Update the knob's position
  //   const knob = document.querySelector('.volume-thumb'); // Replace with your knob selector
  //   if (knob) {
  //     knob.style.bottom = fillPercentage;
  //   }
  // };

  useEffect(() => {
    if (isAudioFooterVisible) {
      const timer = setTimeout(() => {
        const slider = document.querySelector(".slider-container");
        if (slider) {
          slider.classList.remove("slider-initial-hidden");
        }
      }, 300); // Set this to match the footer's animation duration

      return () => clearTimeout(timer);
    }
  }, [isAudioFooterVisible]);

  return (
    <>
      <div className="footer">
        <audio
          className="audio-player"
          ref={audioRef}
          src={currentURL}
          onPlay={() => setIsLoading(false)}
          onPause={() => setIsPlaying(false)}
          onCanPlay={() => {
            setIsLoading(false);
            setSourceError(null); // Reset the error state when the audio is ready to play
          }}
          onWaiting={() => setIsLoading(true)}
          // onStalled={() => setIsLoading(true)}
          onError={() => {
            if (currentURL) {
              setIsLoading(false);
              setIsPlaying(false);
              setSourceError(currentURL); // Set error only if there's a current URL
            }
          }}
        />

        <button
          className="playpause-button"
          onClick={togglePlay}
          title={isPlaying ? "Stop" : "Play"}
        >
          {renderAudioControl()}
        </button>

        <div className="marquee-wrapper">
          {sourceError === currentURL ? (
            <div style={{ textAlign: "center" }}>Error: No source found</div>
          ) : (
            <div
              className="marquee"
              key={displayedItem?.id || JSON.stringify(displayedItem)}
              style={{
                animationPlayState: isPlaying ? "running" : "paused",
                visibility: isLoading ? "hidden" : "visible",
              }}
            >
              {displayedItem
                ? `Playing: ${displayedItem.name} from ${displayedItem.country} `
                : ""}
            </div>
          )}
        </div>

        <div
          className="volume-container"
          onMouseEnter={handleVolumeEnter}
          onMouseLeave={handleVolumeLeave}
        >
          <button
            className="volume-button"
            style={{ visibility: isLoading ? "hidden" : "visible" }}
            onClick={toggleMute}
            title="Toggle mute"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      <div
        onMouseEnter={handleVolumeEnter}
        onMouseLeave={handleVolumeLeave}
        className={`slider-container slider-initial-hidden ${
          isVolumeHovered ? "show" : ""
        }`}
      >
        <div
          className="volume-slider"
          ref={sliderRef}
          // onClick={handleSliderClick}
        >
          <div
            className="volume-thumb"
            onMouseDown={handleMouseDown}
            style={{ bottom: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default AudioFooter;
