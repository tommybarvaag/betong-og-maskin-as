import { GoogleMap as ReactGoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

export default function GoogleMap(props) {
  const { latitude, longitude } = props;

  return (
    <LoadScript id="script-loader" googleMapsApiKey="AIzaSyDNW8nEbulglaNUQriXZRgZR0C-lBGEJSc">
      <ReactGoogleMap
        id="bom-map"
        mapContainerStyle={{
          height: "600px",
          width: "100%"
        }}
        zoom={14}
        center={{
          lat: latitude,
          lng: longitude
        }}
      >
        <Marker
          position={{
            lat: latitude,
            lng: longitude
          }}
        />
      </ReactGoogleMap>
    </LoadScript>
  );
}
