import requests


data = requests.get("http://127.0.0.1:8000/api/data")
print(data.text)