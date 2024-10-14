import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (lat: number, lng: number) => void;
}) {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const handleSubmit = () => {
    if (!latitude || !longitude) {
      alert("Please provide both latitude and longitude");
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Please enter valid numbers for latitude and longitude");
      return;
    }

    onSearch(lat, lng);
    console.log(`Searching for coordinates: ${lat}, ${lng}`);
  };

  return (
    <div className="h-full flex justify-center items-center px-4 bg-slate-800">
      <div className="flex items-center gap-4 w-full max-w-2xl">
        {/* Latitude Input */}
        <input
          type="number"
          placeholder="Latitude"
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />

        {/* Longitude Input */}
        <input
          type="number"
          placeholder="Longitude"
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        {/* Search Button */}
        <Button
          onClick={handleSubmit}
          className="px-4 py-2  hover:bg-slate-500 text-white rounded-md"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
