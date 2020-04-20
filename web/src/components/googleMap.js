import { GoogleMap as ReactGoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import * as React from "react";
import handleViewport from "react-in-viewport";

function GoogleMapBase(props) {
  const { latitude, longitude, inViewport, forwardedRef } = props;
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    if (inViewport) {
      setLoad(true);
    }
  }, [inViewport]);

  const googleMapsApiKey = process.env.BOM_GOOGLE_MAPS_API_KEY;

  return (
    <div ref={forwardedRef}>
      {googleMapsApiKey !== null && googleMapsApiKey !== undefined && load && (
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
      )}
    </div>
  );
}

const GoogleMap = handleViewport(GoogleMapBase, { rootMargin: "-1.0px" });

export default GoogleMap;
