import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import ReactAudioPlayer from "react-audio-player";
import { useSearchParams } from "react-router-dom";

const browserRadioApi = new RadioBrowserApi("My Radio App");

const useRadio = ({country, limit=5}) => {

    const [params] = useSearchParams();
    // console.log(params.get("genre"));

    const genre = params.get("genre") ? [params.get("genre")] : [];
    console.log(genre);

    const [stations, setStations] = useState([]);
    const setupApi = async () => {
       
      
        const radioStations = await browserRadioApi
          .searchStations({
            // language: language.toLowerCase(),
            country: country,
            tagList: genre,
      
            limit: limit,
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.log(error);
          });
      
        return radioStations;
      };

      useEffect(() => {
        setupApi().then((data) => {
          setStations(data);
          console.log(data);
        });
      }, [country, genre.length]);

      return stations;
      
}



export default useRadio;