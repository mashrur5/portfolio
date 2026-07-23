"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Pin = { name: string; lat: number; lng: number; experienceIds: string[] };
export type Country = "canada" | "bangladesh";

const CANADA_PINS: Pin[] = [
  { name: "York University", lat: 43.7735, lng: -79.5019, experienceIds: ["york-research", "york-laps"] },
  { name: "Herb Immortal", lat: 44.1628, lng: -77.3832, experienceIds: ["herb-immortal"] },
  { name: "Neo Financial (Woodbine Mall)", lat: 43.7079, lng: -79.5966, experienceIds: ["neo-financial"] },
];

const BANGLADESH_PINS: Pin[] = [
  {
    name: "Outrageous Dominance (Mirpur DOHS)",
    lat: 23.8347,
    lng: 90.3658,
    experienceIds: ["outrageous-dominance"],
  },
  { name: "Metaphor Digital Media", lat: 23.8047, lng: 90.3654, experienceIds: ["metaphor-coordinator"] },
];

const PIN_CLICK_ZOOM = 15;
const PIN_CLICK_DURATION = 1;
const PIN_WIDTH = 34;
const PIN_HEIGHT = 44;

const pinIcon = L.divIcon({
  className: "",
  html: `
    <svg width="${PIN_WIDTH}" height="${PIN_HEIGHT}" viewBox="0 0 64 84" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="78" rx="10" ry="4" fill="rgba(0,0,0,0.35)" />
      <path d="M32 2C17.7 2 6 13.7 6 28c0 19 26 54 26 54V2Z" fill="#e63946" />
      <path d="M32 2c14.3 0 26 11.7 26 26 0 19-26 54-26 54V2Z" fill="#a9182a" />
      <circle cx="32" cy="28" r="12" fill="#ffffff" />
    </svg>
  `,
  iconSize: [PIN_WIDTH, PIN_HEIGHT],
  iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
});

function boundsFor(pins: Pin[]) {
  return L.latLngBounds(pins.map((p): [number, number] => [p.lat, p.lng]));
}

function FitBounds({ pins }: { pins: Pin[] }) {
  const map = useMap();
  useEffect(() => {
    map.flyToBounds(boundsFor(pins), { padding: [60, 60], maxZoom: 14, duration: 0.8 });
  }, [pins, map]);
  return null;
}

function ResetOnClose({ pins, isOverlayOpen }: { pins: Pin[]; isOverlayOpen: boolean }) {
  const map = useMap();
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !isOverlayOpen) {
      map.flyToBounds(boundsFor(pins), { padding: [60, 60], maxZoom: 14, duration: 0.8 });
    }
    wasOpen.current = isOverlayOpen;
  }, [isOverlayOpen, pins, map]);

  return null;
}

function KeyboardZoomOnHover() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const focusMap = () => container.focus();
    container.addEventListener("mouseenter", focusMap);
    return () => container.removeEventListener("mouseenter", focusMap);
  }, [map]);
  return null;
}

function PinMarkers({
  pins,
  onSelect,
}: {
  pins: Pin[];
  onSelect: (experienceIds: string[]) => void;
}) {
  const map = useMap();

  function handlePinClick(pin: Pin) {
    map.flyTo([pin.lat, pin.lng], PIN_CLICK_ZOOM, { duration: PIN_CLICK_DURATION });
    window.setTimeout(() => onSelect(pin.experienceIds), PIN_CLICK_DURATION * 1000);
  }

  return (
    <>
      {pins.map((pin) => (
        <Marker
          key={pin.name}
          position={[pin.lat, pin.lng]}
          icon={pinIcon}
          eventHandlers={{ click: () => handlePinClick(pin) }}
        />
      ))}
    </>
  );
}

export default function ExperienceMap({
  country,
  isOverlayOpen,
  onSelect,
}: {
  country: Country;
  isOverlayOpen: boolean;
  onSelect: (experienceIds: string[]) => void;
}) {
  const pins = country === "canada" ? CANADA_PINS : BANGLADESH_PINS;

  return (
    <MapContainer
      center={[pins[0].lat, pins[0].lng]}
      zoom={12}
      scrollWheelZoom
      keyboard
      className="h-full w-full"
      style={{ background: "#0a0e1a" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <FitBounds pins={pins} />
      <ResetOnClose pins={pins} isOverlayOpen={isOverlayOpen} />
      <KeyboardZoomOnHover />
      <PinMarkers pins={pins} onSelect={onSelect} />
    </MapContainer>
  );
}
