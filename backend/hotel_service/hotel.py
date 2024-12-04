from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

# Configuration MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'nadasaadi2003*',
    'database': 'hotel_db'
}

# Route pour réserver un hôtel
@app.route('/book_hotel', methods=['POST'])
def book_hotel():
    try:
        data = request.json
        hotel_name = data.get('hotel_name')
        arrival_date = data.get('arrival_date')
        departure_date = data.get('departure_date')
        rooms = int(data.get('rooms', 0))  # Conversion en entier
        price = 80 * rooms  # Prix fictif de 80€ par chambre

        # Vérification des champs obligatoires
        if not hotel_name or not arrival_date or not departure_date or rooms <= 0:
            return jsonify({'error': 'Tous les champs sont obligatoires et doivent être valides'}), 400

        # Connexion à la base de données et insertion des données
        conn = pymysql.connect(**db_config)
        with conn.cursor() as cursor:
            cursor.execute(
                'INSERT INTO hotels (hotel_name, arrival_date, departure_date, rooms, price) VALUES (%s, %s, %s, %s, %s)',
                (hotel_name, arrival_date, departure_date, rooms, price)
            )
        conn.commit()
        conn.close()

        return jsonify({
            'message': 'Hôtel réservé avec succès',
            'hotel_name': hotel_name,
            'arrival_date': arrival_date,
            'departure_date': departure_date,
            'rooms': rooms,
            'price': price
        })
    except pymysql.MySQLError as e:
        return jsonify({'error': f'Erreur MySQL: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Erreur serveur: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
