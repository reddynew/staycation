import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { toast,Toaster} from "sonner";
import { useHotels } from "@/contexts/HotelContext";
import { AdSpaces } from "@/components/ads/AdSpaces";
import { HotelSearchForm } from "@/components/hotels/HotelSearchForm";
import { HotelCard } from "@/components/hotels/HotelCard";
import { BookingDialog } from "@/components/hotels/BookingDialog";
// import MapView from "@/components/maps/MapView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapIcon, ListIcon } from "lucide-react";

const Hotels = () => {
  const { hotels, addBooking,addfav } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(1);
  const [child, setchild] = useState(1);
  const [location, setLocation] = useState("");
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  const [highlightedHotelId, setHighlightedHotelId] = useState(null);
  
  const handleSearch = () => {
    if (!location) {
      toast.error("Please enter a location");
      return;
    }

    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    
    setFilteredHotels(filtered);
    
    if (filtered.length > 0 && filtered[0].latitude && filtered[0].longitude) {
      setMapCenter([filtered[0].longitude, filtered[0].latitude]);
      setMapZoom(10);
    }
  };

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    addBooking({
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      checkIn,
      checkOut,
      guests,
    });
    toast.success("Booking confirmed!");
    setSelectedHotel(null);
    setCheckIn('')
    setCheckOut('')
    setGuests('')
  };

  const handleViewOnMap = (hotelId) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel && hotel.latitude && hotel.longitude) {
      setMapCenter([hotel.longitude, hotel.latitude]);
      setMapZoom(14);
      setViewMode("map");
      setHighlightedHotelId(hotelId);
    }
  };

  const handleMarkerClick = (hotelId) => {
    setHighlightedHotelId(hotelId);
    const element = document.getElementById(`hotel-${hotelId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    setHighlightedHotelId(null);
  }, [filteredHotels]);

  const mapMarkers = filteredHotels
    .filter(hotel => hotel.latitude && hotel.longitude)
    .map(hotel => ({
      id: hotel.id,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      title: hotel.name,
      description: `$${hotel.price}/night`
    }));
   
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:pl-20">
        <AdSpaces>
        <HotelSearchForm
              location={location}
              setLocation={setLocation}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              guests={guests}
              child={child}
              setGuests={setGuests}
              setchild={setchild}
              onSearch={handleSearch}
            />
        {viewMode === "list" && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => (
                  <div id={`hotel-${hotel.id}`} key={hotel.id}>
                    <HotelCard
                      hotel={hotel}
                      onBookNow={setSelectedHotel}
                      isHighlighted={hotel.id === highlightedHotelId}
                    />
                  </div>
                ))}
              </div>
            )}
        </AdSpaces>
        {selectedHotel &&
        <BookingDialog
          hotel={selectedHotel}
          isOpen={!!selectedHotel}
          onClose={() => setSelectedHotel(null)}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          guests={guests}
          setGuests={setGuests}
          onBook={handleBook}
        />
        }
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;
