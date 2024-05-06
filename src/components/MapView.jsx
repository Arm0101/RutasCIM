import { useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import Point from "./Point";
import LocationMarkers from "./LocationMarkers";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import "./MapView.css";

import points from "../data/points.json";

export function MapView() {
  const [center] = useState({ lat: 23.0964, lng: -82.4226 });
  const ZOOM = 13;
  const mapRef = useRef();

  const [route, setRoute] = useState([]);

  const updateRoute = async (waypoints) => {
    if (waypoints.length < 2) return;
    const apiKey = import.meta.env.VITE_API_KEY;
    const coordinates = waypoints.map(({ lat, lng }) => [lng, lat]);
    const body = JSON.stringify({
      coordinates,
    });
    const url = import.meta.env.VITE_OPEN_ROUTE_URL;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: body,
      });
      const data = await response.json();
      if (!data.features || data.features.length === 0) {
        console.error("No route found.");
        return;
      }
      const coordinates = data.features[0].geometry.coordinates.map(
        (coord) => ({ lat: coord[1], lng: coord[0] })
      );
      setRoute(coordinates);
    } catch (error) {
      console.error("Failed to fetch route", error);
    }
  };

  return (
    <MapContainer
      className="map-container"
      center={center}
      zoom={ZOOM}
      ref={mapRef}
    >
      <TileLayer
        url={`${import.meta.env.VITE_TILES_URL}{z}/{x}/{y}.png`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map(({ id, lat, lng, name }) => (
        <Point key={id} lat={lat} lng={lng} name={name} />
      ))}
      <LocationMarkers updateRoute={updateRoute} />
      {route.length > 0 && <Polyline positions={route} color="red" />}
    </MapContainer>
  );
}
