import requests

url = 'http://localhost:5000/calculate_total'
data = {
    'flight_price': 300.0,
    'hotel_price': 500.0
}

response = requests.post(url, json=data)

# Vérification du statut HTTP
if response.status_code == 200:
    try:
        print(response.json())
    except requests.exceptions.JSONDecodeError:
        print("Erreur : La réponse n'est pas en JSON valide.")
else:
    print(f"Erreur : Statut HTTP {response.status_code}")
    print(response.text)
