import json

def load_products():
    with open('products.json', 'r') as file:
        return json.load(file)

def search_products(products, query):
    query = query.lower()
    return [p for p in products if query in p['name'].lower()]
