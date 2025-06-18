
import { createContext, useContext, useState } from "react";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels] = useState([
    {
      id: 1,
      name: "Luxury Resort & Spa",
      location: "Miami Beach, FL",
      price: 2999,
      rating: 4.8,
      image:[ 
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      description: "Experience luxury living with ocean views and world-class amenities."
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      location: "Aspen, CO",
      price: 1999,
      rating: 4.5,
      image: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      description: "Cozy mountain retreat with stunning views and ski-in/ski-out access."
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "New York City, NY",
      price: 3499,
      rating: 4.7,
      image: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      description: "Sophisticated urban oasis in the heart of Manhattan."
    }
  ]);

  const [bookings, setBookings] = useState([]);
  const [favourites,setfavourites] = useState([])
  const [guests, setGuests] = useState([]);
  console.log(bookings);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, { ...booking, id: Date.now() }]);
  };

  const addfav=(fav)=>{
    setfavourites((prev) =>[... prev,{... fav}])
    console.log("this is fav : ",fav)
    // console.log('favourites are ', favourites)
  }
  return (
    <HotelContext.Provider value={{ hotels, bookings, addBooking,addfav,favourites }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotels must be used within a HotelProvider");
  }
  return context;
};
