// components/Favourites.tsx
import React, { useState } from "react";
import { useHotels } from "../contexts/HotelContext";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Compare from "../components/Compare";

function Favourites() {
  const { favourites } = useHotels();
  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleSelection = (hotelId: number) => {
    setSelectedHotels((prev) =>
      prev.includes(hotelId)
        ? prev.filter((id) => id !== hotelId)
        : prev.length < 2
        ? [...prev, hotelId]
        : prev
    );
  };

  const selectedHotelData = favourites.filter((h) =>
    selectedHotels.includes(h.id)
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favourites.length === 0 ? (
          <p className="col-span-full text-center">No favourites yet</p>
        ) : (
          favourites.map((favourite) => (
            <div
              key={favourite.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              <img
                src={favourite.image[0]}
                alt={favourite.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 space-y-1">
                <input
                  type="checkbox"
                  checked={selectedHotels.includes(favourite.id)}
                  onChange={() => handleSelection(favourite.id)}
                  disabled={
                    !selectedHotels.includes(favourite.id) &&
                    selectedHotels.length === 2
                  }
                />
                <h3 className="text-sm font-semibold truncate">
                  {favourite.name}
                </h3>
                <p className="flex items-center text-xs text-gray-500 truncate">
                  <MapPin className="h-4 w-4 mr-1" />
                  {favourite.location}
                </p>
                <div className="text-xs text-yellow-500">★ {favourite.rating}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedHotels.length === 2 && (
        <div className="mt-4">
          <Button onClick={() => setIsCompareOpen(true)}>Compare</Button>
        </div>
      )}

      <Compare
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        selectedHotelData={selectedHotelData}
      />
    </div>
  );
}

export default Favourites;
