CREATE TABLE IF NOT EXISTS config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  database TEXT
);
INSERT OR IGNORE INTO "main"."config" ("id", "type", "username", "password", "host", "port", "database") VALUES (1, 'mysql', 'root', '123456', '127.0.0.1', 3306, NULL);