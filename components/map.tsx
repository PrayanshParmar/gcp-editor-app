"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Install uuid with `npm install uuid`

// Define GCP type with id, tag, and images
type GCP = {
  id: string;
  tag: string;
  lat: number;
  lng: number;
  alt: number;
  images: string[]; // Array of image URLs or file references
};

function MapEvents({
  setGcps,
  gcpCounter,
  incrementCounter,
}: {
  setGcps: React.Dispatch<React.SetStateAction<GCP[]>>;
  gcpCounter: number;
  incrementCounter: () => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const tag = `GCP${String(gcpCounter).padStart(3, "0")}`;
      const id = uuidv4(); // Generate a unique ID
      setGcps((prev) => [
        ...prev,
        { id, tag, lat, lng, alt: 0, images: [] }, // Initialize with empty images
      ]);
      incrementCounter(); // Increment counter after adding a GCP
    },
  });
  return null;
}

export default function Map({
  gcps,
  setGcps,
}: {
  gcps: GCP[];
  setGcps: React.Dispatch<React.SetStateAction<GCP[]>>;
}) {
  const [gcpCounter, setGcpCounter] = useState(1);

  const incrementCounter = () => setGcpCounter((prev) => prev + 1);

  const handleImageUpload = (id: string, newImage: string) => {
    setGcps((prev) =>
      prev.map((gcp) =>
        gcp.id === id ? { ...gcp, images: [...gcp.images, newImage] } : gcp
      )
    );
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents
        setGcps={setGcps}
        gcpCounter={gcpCounter}
        incrementCounter={incrementCounter}
      />
      {gcps.map((gcp) => (
        <Marker
          key={gcp.id}
          position={[gcp.lat, gcp.lng]}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              setGcps((prev) =>
                prev.map((p) =>
                  p.id === gcp.id
                    ? { ...p, lat: position.lat, lng: position.lng }
                    : p
                )
              );
            },
          }}
        >
          <Popup>
            <div>
              <p>{gcp.tag}</p>
              <p>Latitude: {gcp.lat.toFixed(4)}</p>
              <p>Longitude: {gcp.lng.toFixed(4)}</p>
              <label>
                Upload Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const newImage = URL.createObjectURL(e.target.files[0]);
                      handleImageUpload(gcp.id, newImage);
                    }
                  }}
                />
              </label>
              <div>
                <strong>Images:</strong>
                <ul>
                  {gcp.images.map((img, index) => (
                    <li key={index}>
                      <img
                        src={img}
                        alt={`GCP ${gcp.tag} Image ${index + 1}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
