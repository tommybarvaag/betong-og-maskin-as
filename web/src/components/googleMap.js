import { GoogleMap as ReactGoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

export default function GoogleMap(props) {
  const { latitude, longitude } = props;

  const googleMapsApiKey = process.env.BOM_GOOGLE_MAPS_API_KEY;

  return (
    googleMapsApiKey !== null &&
    googleMapsApiKey !== undefined && (
      <LoadScript id="script-loader" googleMapsApiKey={googleMapsApiKey}>
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
    )
  );
}
