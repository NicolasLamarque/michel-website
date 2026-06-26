CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  courriel TEXT NOT NULL,
  telephone TEXT,
  type_projet TEXT,
  message TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'nouveau',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
