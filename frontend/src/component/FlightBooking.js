import React, { useState } from 'react';

function FlightBooking() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ departure: '', return: '' });
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flightData = {
      departure: dates.departure,
      arrival: destination,
      date: dates.departure, // Vous pouvez ajuster cela si nécessaire
      passengers: parseInt(passengers, 10), // Assurez-vous que 'passengers' est un nombre entier
    };

    try {
      const response = await fetch('http://localhost:5000/book_flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage(`Réservation réussie ! Vol réservé de ${data.departure} à ${data.arrival} pour ${data.passengers} passagers. Total : ${data.price}€`);
      } else {
        setMessage('Erreur lors de la réservation du vol : ' + data.error);
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <div>
      <h2>Réservation de Vol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date de départ"
          value={dates.departure}
          onChange={(e) => setDates({ ...dates, departure: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Date de retour"
          value={dates.return}
          onChange={(e) => setDates({ ...dates, return: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Nombre de passagers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Réserver le vol</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default FlightBooking;
