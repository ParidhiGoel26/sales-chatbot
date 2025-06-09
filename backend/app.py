from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ MySQL connection config (XAMPP default)
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="sales" 
    )

@app.route('/')
def index():
    return "✅ Sales Chatbot Backend is Running!"

@app.route('/api/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '').lower()

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM products")
        rows = cursor.fetchall()
        #conn.close()


        results = []
        for row in rows:
            print(row[2])
            name = (row[1] or "").lower()
            category = (row[2] or "").lower()

            if query in name or query in category:
                results.append({
                    "id": row[0],
                    "name": row[1],
                    "category": row[2],
                    "price": float(row[3]),
                    "stock": row[4]
                })

        print(f"Matches found: {len(results)}")
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/debug-products')
def debug_products():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products LIMIT 10")
    rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

if __name__ == '__main__':
    app.run(debug=True)
