import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

function Point({ lat, lng, name }) {
  return (
    <Marker position={[lat, lng]}>
      <Popup>{name}</Popup>
    </Marker>
  );
}
Point.propTypes = {
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Point;
