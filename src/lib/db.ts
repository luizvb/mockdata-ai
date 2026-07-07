import { PGlite } from '@electric-sql/pglite';

// Initialize a new PGlite instance in memory or indexeddb (in-browser) or file (node)
// For Next.js App Router (Server Actions or API Routes), we will use memory for simplicity during MVP
// But to persist it between restarts, we could use a path. Let's use memory for now.

const db = new PGlite();

export async function getDb() {
  // Ensure the table exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS mock_generations (
      id SERIAL PRIMARY KEY,
      schema TEXT NOT NULL,
      result TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return db;
}
