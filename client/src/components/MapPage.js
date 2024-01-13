// MapPage.js
import React from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "./MapComponent";

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  return <MapComponent lat={lat} lng={lng} />;
};

export default MapPage;
