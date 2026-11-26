# MakeMyTrip — High-Fidelity Website Clone

A high-fidelity recreation of the **MakeMyTrip (MMT)** website built with React, Vite, Tailwind CSS, and Lucide Icons.

## 🚀 Key Features

### 1. Brand Identity & Visual Fidelity
- **Authentic Logo**: Exact brand typography with bold `make`, white-on-red `my` badge, and deep navy `trip`.
- **Hero Banner**: Atmospheric deep navy gradient (`#051322` → `#0a223d` → `#15457b`) with subtle celestial starlight pattern.
- **Product Navigation Bar**: Horizontal tab bar with custom category icons (Flights, Hotels, Homestays, Holiday Packages, Trains, Buses, Cabs, Forex, Insurance) with active blue underlines and indicator pills.
- **Universal Booking Widget**: Dynamic white rounded card featuring radio selectors, multi-column location inputs, two-way city swap button, date pickers, traveller selectors, special fare pills (Student, Senior Citizen, Armed Forces, Doctors), and the overlapping centered **SEARCH** button with vibrant blue gradient glow.

### 2. Complete Search & Booking Workflows
- **✈️ Flights (`/flights/search`)**:
  - 14 realistic Indian flight schedules (IndiGo, Air India, Akasa Air, SpiceJet, Vistara).
  - 7-day price carousel strip.
  - Multi-faceted filter sidebar (Price slider, Non-stop/1-stop, Airlines, Departure time slots: Before 6 AM, 6 AM - 12 PM, 12 PM - 6 PM, After 6 PM).
  - Sorting: Cheapest first, Fastest first, Earliest departure.
  - Flight details drawer (Check-in baggage, Cabin baggage, In-flight meals, Cancellation terms).
  - Fare options drawer (Saver, Flexi Plus, Super 6E).
  - Interactive Passenger details checkout modal with simulated payment & confetti confirmation!

- **🏨 Hotels (`/hotels/search`)**:
  - 15 luxury resorts & boutique heritage hotels (Goa, Jaipur, Manali, Udaipur, Delhi, Mumbai, Bengaluru, Shimla, Rishikesh, Ooty).
  - Photo gallery preview, star category, guest rating badge (e.g. 4.8 Exceptional), location proximity, amenities tags.
  - Room selection modal (Deluxe Room, Villa, Suite) with breakfast and cancellation terms.
  - Filters by star rating, user rating (4.5+, 4.0+), price slider, and amenities (Pool, Breakfast, WiFi, Spa, Beach).

- **🚆 Trains (`/trains/search`)**:
  - 10 Indian express & high-speed trains (Vande Bharat Express, Tejas Rajdhani, Shatabdi, Duronto, Punjab Mail).
  - IRCTC Authorized Partner badge and Quota selector (General, Tatkal, Ladies).
  - Live IRCTC classes (1A, 2A, 3A, SL, CC, EC) showing real status (`AVAILABLE 48`, `WL 14`, `RAC 18`) with Indian Rupee pricing.

- **🚌 Buses (`/buses/search`)**:
  - 10 verified bus operators (Zingbus Plus, IntrCity SmartBus, SRS Travels, Orange Travels, VRL, Hans).
  - Filters for AC Sleeper & AC Seater.
  - **Interactive Seat Map Modal**: Lower Deck & Upper Deck sleeper berths, clickable seat selection, female reserved seats, live fare calculation.

- **🚕 Cabs (`/cabs/search`)**:
  - Outstation One-Way, Round-Trip, Airport Transfers, Hourly Rentals.
  - Vehicle types: Hatchback (WagonR), Sedan (Dzire), SUV (Ertiga), Prime SUV (Innova Crysta).
  - Toll taxes and state permits covered, driver allowance, cancellation policy, luggage and passenger capacity.

- **🌴 Holiday Packages (`/holidays`)**:
  - 10 curated vacation packages (Kashmir, Rajasthan, Himachal, Kerala, Goa, Andaman, Dubai, Bali, Thailand, Golden Triangle).
  - Duration indicators (e.g. 5N / 6D), day-wise itinerary breakdown, inclusions (Hotels, Flights, Transfers, Sightseeing, Meals), starting price per person.

### 3. User Experience & Persistence
- **👤 Login / Signup Modal**:
  - Mobile number + simulated 4-digit OTP verification flow.
  - Authenticated user state stored in `LocalStorage` with profile dropdown.
- **🧳 My Trips Drawer**:
  - Slide-out management panel listing all active and completed reservations.
  - **E-Ticket & Boarding Pass View**: Interactive voucher modal with PNR, flight/hotel info, barcode, and print/download pass.
- **🎉 Confetti Celebrations**:
  - Confetti animation triggered upon every confirmed booking.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 3
- **Icons**: Lucide React
- **Animations**: Canvas Confetti, Tailwind Transitions & Animations
- **Routing**: React Router DOM 6
- **Typography**: Google Fonts (Lato: 300, 400, 700, 900)
- **State Management**: React Context (`BookingContext`) with LocalStorage persistence

---

## 💻 How to Run Locally

1. Open your terminal and navigate to the project directory:
   ```bash
   cd "C:\Users\DELL\.gemini\antigravity\scratch\makemytrip-clone"
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit:
   ```
   http://localhost:5173
   ```

4. Or build and preview the production bundle:
   ```bash
   npm run build
   npm run preview
   ```
