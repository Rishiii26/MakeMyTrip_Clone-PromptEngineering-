import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

const INITIAL_TRIPS = [
  {
    bookingId: 'MMT-FL-89241',
    category: 'Flight',
    title: 'Delhi → Mumbai',
    subtitle: 'IndiGo 6E-2054',
    date: '24 Mar 2026',
    time: '06:00 - 08:15',
    status: 'Confirmed',
    amount: 4899,
    traveller: 'Rahul Sharma',
    pnr: 'Q8K2LM',
    details: 'Terminal 3 DEL → Terminal 2 BOM • Seat 14B (Window) • 15kg Baggage Included'
  },
  {
    bookingId: 'MMT-HT-33109',
    category: 'Hotel',
    title: 'Taj Exotica Resort & Spa',
    subtitle: 'Deluxe Room Garden View (Goa)',
    date: '12 Apr - 15 Apr 2026',
    time: 'Check-in 14:00 • Check-out 11:00',
    status: 'Confirmed',
    amount: 55500,
    traveller: 'Rahul Sharma',
    pnr: 'HT-GOA-771',
    details: '3 Nights • 2 Guests • Breakfast Buffet Included • Free Cancellation'
  }
];

export const BookingProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mmt_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('flights');

  // Booking history / My Trips
  const [myTrips, setMyTrips] = useState(() => {
    const saved = localStorage.getItem('mmt_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  useEffect(() => {
    localStorage.setItem('mmt_trips', JSON.stringify(myTrips));
  }, [myTrips]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mmt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mmt_user');
    }
  }, [user]);

  // Flight search params
  const [flightParams, setFlightParams] = useState({
    tripType: 'oneway',
    from: 'DEL',
    fromCity: 'Delhi',
    fromAirport: 'Indira Gandhi International Airport',
    to: 'BOM',
    toCity: 'Mumbai',
    toAirport: 'Chhatrapati Shivaji Maharaj International Airport',
    departureDate: '2026-03-24',
    returnDate: '2026-03-28',
    travellers: { adults: 1, children: 0, infants: 0 },
    travelClass: 'Economy/Premium Economy',
    fareType: 'regular'
  });

  // Hotel search params
  const [hotelParams, setHotelParams] = useState({
    destination: 'Goa',
    city: 'Goa',
    checkInDate: '2026-04-12',
    checkOutDate: '2026-04-15',
    rooms: 1,
    adults: 2,
    children: 0,
    priceRange: 'all'
  });

  // Train search params
  const [trainParams, setTrainParams] = useState({
    fromStation: 'NDLS',
    fromCity: 'New Delhi',
    toStation: 'MMCT',
    toCity: 'Mumbai Central',
    travelDate: '2026-03-24',
    quota: 'General'
  });

  // Bus search params
  const [busParams, setBusParams] = useState({
    fromCity: 'Delhi',
    toCity: 'Manali',
    travelDate: '2026-03-24'
  });

  // Cab search params
  const [cabParams, setCabParams] = useState({
    type: 'outstation_oneway',
    fromCity: 'Delhi',
    toCity: 'Agra',
    departureDate: '2026-03-24',
    pickupTime: '06:00 AM'
  });

  // Holiday search params
  const [holidayParams, setHolidayParams] = useState({
    destination: 'Kashmir',
    duration: 'all'
  });

  // Add booking to My Trips + celebratory confetti
  const addBooking = (newBooking) => {
    const booking = {
      ...newBooking,
      bookingId: `MMT-${Math.floor(10000 + Math.random() * 90000)}`,
      pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    };
    setMyTrips(prev => [booking, ...prev]);

    // Trigger confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    return booking;
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <BookingContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isMyTripsOpen,
        setIsMyTripsOpen,
        myTrips,
        addBooking,
        activeTab,
        setActiveTab,
        flightParams,
        setFlightParams,
        hotelParams,
        setHotelParams,
        trainParams,
        setTrainParams,
        busParams,
        setBusParams,
        cabParams,
        setCabParams,
        holidayParams,
        setHolidayParams
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
