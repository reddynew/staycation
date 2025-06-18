import { useHotels } from "@/contexts/HotelContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronLeft, ChevronRight,Heart } from "lucide-react";
import { useState } from "react";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    location: string;
    price: number;
    description: string;
    image: string[]; // Now array of images
    latitude?: number;
    longitude?: number;
  };
  onBookNow: (hotel: any) => void;
  onViewOnMap?: (hotelId: number) => void;
  isHighlighted?: boolean;
}

export const HotelCard = ({
  hotel,
  onBookNow,
  onViewOnMap,
  isHighlighted = false,
}: HotelCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotel.image.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.image.length - 1 : prev - 1
    );
  };
  const [isFavorite, setIsFavorite] = useState(false);
  const {addfav}=useHotels()
  const handlefav=()=>{
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 card-hover ${
        isHighlighted ? "ring-2 ring-primary shadow-lg" : ""
      }`}
    >
      <button
          onClick={()=>{
            addfav(hotel)
            handlefav()
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      {/* Image Slider */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={hotel.image[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1} of ${hotel.name}`}
          className="w-full h-48 object-cover transition-all duration-300"
        />
        {/* Slider controls */}
        {hotel.image.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 p-1 rounded-full shadow hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 p-1 rounded-full shadow hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{hotel.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {hotel.location}
            </CardDescription>
          </div>
          {hotel.latitude && hotel.longitude && onViewOnMap && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              onClick={() => onViewOnMap(hotel.id)}
              title="View on map"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">INR {hotel.price}/night</p>
        <p className="text-gray-600">{hotel.description}</p>
      </CardContent>

      <CardFooter>
        <Button onClick={() => onBookNow(hotel)} className="w-full">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};
