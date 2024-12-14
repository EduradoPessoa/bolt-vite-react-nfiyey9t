export const productsTable = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  product_type_id INTEGER REFERENCES product_types(id),
  product_group_id INTEGER REFERENCES product_groups(id),
  min_stock INTEGER NOT NULL DEFAULT 0,
  current_stock INTEGER NOT NULL DEFAULT 0,
  warehouse_id INTEGER REFERENCES warehouses(id),
  default_price_table_id INTEGER REFERENCES price_tables(id),
  last_purchase_date DATE,
  last_purchase_price DECIMAL(10,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;