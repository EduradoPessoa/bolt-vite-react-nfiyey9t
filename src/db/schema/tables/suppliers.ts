export const suppliersTable = `
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  person_type TEXT NOT NULL CHECK (person_type IN ('PF', 'PJ')),
  document TEXT NOT NULL UNIQUE,
  email TEXT,
  phone TEXT,
  state TEXT,
  city TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;