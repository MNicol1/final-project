// MapComponent.js
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "styled-components";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ lat, lng }) => {
  return (
    <MapWrapper>
      <MapContainer
        center={[lat, lng]}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;

  @media (max-width: 600px) {
    height: calc(100vh - 75px);
    width: 100%;
  }
`;

export default MapComponent;
