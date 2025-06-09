import sqlite3

# Connect to SQLite DB (or create it)
conn = sqlite3.connect('products.db')
cursor = conn.cursor()

# Create products table
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL,
    category TEXT
)
''')

# Add 100 mock products
products = [
    (f"Product {i}", f"This is the description of product {i}.", round(10 + i * 2.5, 2), "electronics")
    for i in range(1, 101)
]

cursor.executemany('INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)', products)

conn.commit()
conn.close()

print("✅ Database setup complete with 100 mock products.")
