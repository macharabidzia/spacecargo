// components/features/tracking/MapWrapper.tsx
"use client"; // This is now a Client Component

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import GoogleMapComponent only on the client-side
const GoogleMapComponent = dynamic(
  () => import("@/components/common/GoogleMapComponent"),
  { ssr: false } // This is now allowed because MapWrapper is a Client Component
);

interface MapWrapperProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markerPosition?: { lat: number; lng: number };
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  center,
  zoom,
  markerPosition,
}) => {
  return (
    <GoogleMapComponent
      center={center}
      zoom={zoom}
      markerPosition={markerPosition}
    />
  );
};

export default MapWrapper;
