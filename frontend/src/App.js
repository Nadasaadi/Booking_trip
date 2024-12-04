// src/App.js
import React from 'react';
import FlightBooking from './component/FlightBooking';
import HotelBooking from './component/HotelBooking';
import TotalAmount from './component/TotalAmount';

function App() {
  return (
    <div className="App">
      <h1>Plateforme de Réservation</h1>
      <FlightBooking />
      <HotelBooking />
      <TotalAmount />
    </div>
  );
}

export default App;
