export const priceTablesTable = `
CREATE TABLE IF NOT EXISTS price_tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  margin_percentage DECIMAL(10,2) NOT NULL DEFAULT 30.00,
  active BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;