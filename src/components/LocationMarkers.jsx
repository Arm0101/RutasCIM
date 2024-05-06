import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";
export function LocationMarkers({ updateRoute }) {
  const [, setMarkers] = useState([]);

  useMapEvents({
    click(e) {
      const newMarker = {
        key: `marker_${e.latlng.lat}-${e.latlng.lng}`,
        position: e.latlng,
      };
      setMarkers((currentMarkers) => {
        const updatedMarkers = [...currentMarkers, newMarker];
        updateRoute(updatedMarkers.map((marker) => marker.position)); // Actualiza la ruta cada vez que se añade un nuevo marcador
        return updatedMarkers;
      });
    },
  });

  return <></>;
}
LocationMarkers.propTypes = {
  updateRoute: PropTypes.func,
};
export default LocationMarkers;
