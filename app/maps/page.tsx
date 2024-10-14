"use client";

import React, { useState } from "react";
import MapDisplay from "./(components)/map-display";
import SearchBar from "./(components)/search";
import Filter from "./(components)/filter";

type Props = {};

function Maps({}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchCoords, setSearchCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSearch = (lat: number, lng: number) => {
    setSearchCoords({ lat, lng });
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Navbar container */}
      <div className="w-full h-20 bg-slate-800 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="text-white text-2xl  items-center hidden md:block">
          <h3 className="font-bold text-2xl">
            Texas <span className="text-red-500">Map</span>
          </h3>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center px-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter on the far right */}
        <div className="flex items-center ml-2">
          <Filter setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      {/* Map display */}
      <MapDisplay
        searchCoords={searchCoords}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Maps;
