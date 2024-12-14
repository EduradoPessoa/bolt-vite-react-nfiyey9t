// Previous schema remains unchanged

// Add Product Types table
CREATE TABLE IF NOT EXISTS product_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

// Add product_type_id to products table
ALTER TABLE products ADD COLUMN product_type_id INTEGER REFERENCES product_types(id);