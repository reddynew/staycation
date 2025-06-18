// components/CompareModal.tsx
import React from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

type Hotel = {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  description: string;
  image: string[];
};

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHotelData: Hotel[];
}

const Compare: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  selectedHotelData,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white max-w-4xl w-full rounded-lg shadow-xl p-6">
          <Dialog.Title className="text-lg font-bold mb-4">Hotel Comparison</Dialog.Title>
          <div className="grid grid-cols-2 gap-4">
            {selectedHotelData.map((hotel) => (
              <div key={hotel.id} className="border rounded p-4">
                <img
                  src={hotel.image[0]}
                  alt={hotel.name}
                  className="h-32 w-full object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-600">{hotel.location}</p>
                <p className="text-sm text-yellow-500">★ {hotel.rating}</p>
                <p className="text-sm text-gray-700 mt-2">{hotel.description}</p>
                <p className="text-md font-bold mt-2">INR {hotel.price}/night</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Button onClick={onClose}>Close</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Compare;
