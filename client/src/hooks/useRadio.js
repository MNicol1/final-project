import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";

import { useSearchParams } from "react-router-dom";

const browserRadioApi = new RadioBrowserApi("My Radio App");

const useRadio = ({ country, limit = 4}) => {
  const [params] = useSearchParams();

  const genre = params.get("genre") ? [params.get("genre")] : [];

  const [stations, setStations] = useState([]);
  const setupApi = async () => {
    const radioStations = await browserRadioApi
      .searchStations({
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
      // console.log(data);
    });
  }, [country, params]);

  return stations;
};

export default useRadio;
