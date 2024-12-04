import React, { useState } from 'react';

function TotalAmount() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [flightAmount, setFlightAmount] = useState(500);  // Exemple de montant de vol
  const [hotelAmount, setHotelAmount] = useState(300);    // Exemple de montant d'hôtel

  const calculateTotal = async () => {
    // Envoi de la requête POST avec les prix du vol et de l'hôtel
    const response = await fetch('http://localhost:5000/calculate_total', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flight_price: flightAmount,
        hotel_price: hotelAmount,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setTotalAmount(data.total_price); // Mise à jour du montant total
    } else {
      alert('Erreur lors du calcul du total');
    }
  };

  return (
    <div>
      <h2>Montant Total</h2>
      <button onClick={calculateTotal}>Calculer le montant total</button>
      <p>Montant total à payer: {totalAmount} €</p>
    </div>
  );
}

export default TotalAmount;
