import React, { useState } from 'react';

function HotelBooking() {
  const [hotelCriteria, setHotelCriteria] = useState({
    hotel_name: '',
    arrival_date: '',
    departure_date: '',
    rooms: 1,
  });

  const [message, setMessage] = useState(''); // État pour afficher le message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/book_hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelCriteria),
      });

      const data = await response.json();
      console.log('Réservation réussie:', data);

      // Afficher le message de réservation réussie sous le formulaire
      setMessage(`Réservation réussie : Hôtel ${data.hotel_name}, Prix total: ${data.price} €`);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setMessage('Erreur lors de la réservation de l\'hôtel.'); // Afficher message d'erreur en cas d'échec
    }
  };

  return (
    <div>
      <h2>Réservation d'Hôtel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de l'hôtel"
          value={hotelCriteria.hotel_name}
          onChange={(e) => setHotelCriteria({ ...hotelCriteria, hotel_name: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Date d'arrivée"
          value={hotelCriteria.arrival_date}
          onChange={(e) => setHotelCriteria({ ...hotelCriteria, arrival_date: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Date de départ"
          value={hotelCriteria.departure_date}
          onChange={(e) => setHotelCriteria({ ...hotelCriteria, departure_date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Nombre de chambres"
          value={hotelCriteria.rooms}
          onChange={(e) => setHotelCriteria({ ...hotelCriteria, rooms: e.target.value })}
          min="1"
          required
        />
        <button type="submit">Réserver l'hôtel</button>
      </form>

      {/* Affichage du message sous le formulaire */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default HotelBooking;
