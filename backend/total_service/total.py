from flask import Flask, request, jsonify
import mysql.connector

# Configuration de la base de données
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'nadasaadi2003*',
    'database': 'total_db'
}

app = Flask(__name__)

# Fonction pour la connexion à la base de données
def get_connection():
    return mysql.connector.connect(
        host=DB_CONFIG['host'],
        user=DB_CONFIG['user'],
        password=DB_CONFIG['password'],
        database=DB_CONFIG['database']
    )

@app.route('/calculate_total', methods=['POST'])
def calculate_total():
    try:
        data = request.json
        flight_price = data['flight_price']
        hotel_price = data['hotel_price']
        total_price = flight_price + hotel_price

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO totals (flight_price, hotel_price, total_price)
            VALUES (%s, %s, %s)
        """, (flight_price, hotel_price, total_price))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'total_price': total_price})  # Retour du total calculé
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
