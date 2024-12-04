from flask import Flask, request, jsonify
from flask_cors import CORS  # Importer Flask-CORS
import pymysql

app = Flask(__name__)
CORS(app)  # Activer CORS pour toutes les routes

# Configuration MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'nadasaadi2003*',
    'database': 'flight_db'
}

@app.route('/book_flight', methods=['POST'])
def book_flight():
    try:
        # Récupération des données envoyées dans la requête
        data = request.json
        departure = data['departure']
        arrival = data['arrival']
        date = data['date']
        passengers = int(data['passengers'])  # Assurez-vous que 'passengers' est un entier
        price = 100 * passengers  # Prix fictif de 100€ par passager

        # Vérification des champs obligatoires
        if not departure or not arrival or not date or passengers <= 0:
            return jsonify({'error': 'Tous les champs sont obligatoires et doivent être valides'}), 400

        # Insertion des données dans la table 'flights'
        conn = pymysql.connect(**db_config)
        with conn.cursor() as cursor:
            cursor.execute(
                'INSERT INTO flights (departure, arrival, date, passengers, price) VALUES (%s, %s, %s, %s, %s)',
                (departure, arrival, date, passengers, price)
            )
        conn.commit()
        conn.close()

        # Retourner une réponse JSON avec les informations de la réservation
        return jsonify({
            'message': 'Vol réservé avec succès',
            'departure': departure,
            'arrival': arrival,
            'date': date,
            'passengers': passengers,
            'price': price
        })
    except pymysql.MySQLError as e:
        return jsonify({'error': f'Erreur MySQL: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Erreur serveur: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
