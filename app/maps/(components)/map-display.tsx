"use client";

import React, { useEffect, useState } from "react";
import L, { Icon, Control } from "leaflet";
import dynamic from "next/dynamic";
import mockDrillData from "@/api/data";
import "leaflet/dist/leaflet.css";
import { drillData } from "@/shared/interface/drill_interface";
import FlyToMarker from "./flytomarker";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const texasBounds: [[number, number], [number, number]] = [
  [25.8371, -106.6456],
  [36.5007, -93.5083],
];

const BookmarkControl = ({ onClick }: { onClick: () => void }) => {
  const map = useMap();

  useEffect(() => {
    const controlDiv = L.DomUtil.create("div", "leaflet-bar");
    controlDiv.innerHTML = `
      <div style="cursor: pointer; background-color: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v16l7-5 7 5V3" />
        </svg>
      </div>
    `;

    // Add click event for the bookmark icon
    controlDiv.addEventListener("click", onClick);

    // Add control to the map
    const control = new Control({ position: "topright" });
    control.onAdd = () => controlDiv;
    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, onClick]);

  return null;
};

const MapDisplay = ({
  selectedCategory,
  searchCoords,
}: {
  selectedCategory: string | null;
  searchCoords: { lat: number; lng: number } | null;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [activeEvent, setActiveEvent] = useState<drillData | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [drillData, setDrillData] = useState<drillData[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      const savedFavorites = localStorage.getItem("favourites");
      setFavourites(savedFavorites ? JSON.parse(savedFavorites) : []);
    }

    // Fetch drill data from the API route
    const fetchDrillData = async () => {
      const response = await fetch("/api/drills");
      const data = await response.json();
      setDrillData(data);
    };

    fetchDrillData();
  }, []);

  const handleFavouriteClick = (eventId: string) => {
    let updatedFavourites = favourites.filter((id) => id !== eventId);

    if (!favourites.includes(eventId)) {
      updatedFavourites = [eventId, ...updatedFavourites];
    }

    setFavourites(updatedFavourites);

    if (typeof window !== "undefined") {
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
  };

  const handleListItemClick = (drillId: string) => {
    const event = mockDrillData.find((drill) => drill.id === drillId);
    if (event) {
      setActiveEvent(event);
      setShowBookmarks(false);
    }
  };

  const pitIcon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconAnchor: [12, 41],
    iconSize: [25, 41],
  });

  const trenchIcon: Icon = new Icon({
    iconUrl: "trench-marker.svg",
    iconAnchor: [12, 41],
    iconSize: [25, 41],
  });

  const wellIcon: Icon = new Icon({
    iconUrl: "well-marker.svg",
    iconAnchor: [12, 41],
    iconSize: [25, 41],
  });

  const defaultPosition: [number, number] = [31.9686, -99.9018];
  const icon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconAnchor: [12, 41],
    iconSize: [25, 41],
  });

  if (!isClient) {
    return null;
  }

  const emptyStar = <BookmarkIcon />;
  const fullStar = <BookmarkFilledIcon />;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultPosition}
        zoom={6}
        maxBounds={texasBounds}
        maxBoundsViscosity={1.0}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "1rem",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {drillData
          .filter(
            (drill) => !selectedCategory || selectedCategory === drill.category
          )
          .map((drill) => {
            let drillIcon;
            switch (drill.category) {
              case "Pit":
                drillIcon = pitIcon;
                break;
              case "Trench":
                drillIcon = trenchIcon;
                break;
              case "Well":
                drillIcon = wellIcon;
                break;
              default:
                drillIcon = icon;
            }
            return (
              <Marker
                key={drill.id}
                position={[Number(drill.lat), Number(drill.lng)]}
                icon={drillIcon}
                eventHandlers={{
                  click: () => {
                    setActiveEvent(drill);
                  },
                }}
              />
            );
          })}

        {/* Popup for active event */}
        {activeEvent && (
          <Popup position={[Number(activeEvent.lat), Number(activeEvent.lng)]}>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {activeEvent.title}
              </h2>
              <p className="popup-inner__description">
                {activeEvent.description}
              </p>
              <Button
                variant="ghost"
                onClick={() => handleFavouriteClick(activeEvent.id)}
              >
                {favourites.includes(activeEvent.id) ? (
                  <span className="flex items-center justify-center gap-1">
                    {fullStar} UnBookmark
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    {emptyStar} BookMark
                  </span>
                )}
              </Button>
            </div>
          </Popup>
        )}

        {/* FlyToMarker for search coordinates */}
        {activeEvent && (
          <FlyToMarker
            position={[activeEvent.lat, activeEvent.lng]}
            zoomLevel={15}
          />
        )}
        {searchCoords && (
          <FlyToMarker
            position={[searchCoords.lat, searchCoords.lng]}
            zoomLevel={15}
          />
        )}

        {/* Bookmark Control */}
        <BookmarkControl onClick={() => setShowBookmarks(!showBookmarks)} />
      </MapContainer>

      {/* Bookmarks Modal */}
      {showBookmarks && (
        <div className="absolute top-20 left-0 right-0 bottom-0 z-10 bg-white p-4 overflow-auto">
          <h3 className="font-bold text-xl mb-2">Bookmarked Events</h3>
          <ul>
            {mockDrillData
              .filter((drill) => favourites.includes(drill.id))
              .map((event) => {
                return (
                  <li
                    key={event.id}
                    className="cursor-pointer hover:underline"
                    onClick={() => handleListItemClick(event.id)}
                  >
                    {event.title}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapDisplay;
