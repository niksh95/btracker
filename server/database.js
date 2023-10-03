const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Qetu1357!",
  host: "localhost",
  port: 5432,
  database: "bet_tracker", // Use the "bet_tracker" database
});

// Define the table schema for the new "bets" table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS bets (
    id SERIAL PRIMARY KEY,
    stake DECIMAL,
    odds DECIMAL,
    tipper VARCHAR(255),
    date DATE,
    sport VARCHAR(255),
    league VARCHAR(255),
    result VARCHAR(255),
    type VARCHAR(255)
  );`;

pool
  .query(createTableQuery)
  .then(() => {
    console.log("Bets table created successfully");
  })
  .catch((err) => {
    console.error("Error creating the bets table:", err);
  });

  // ... existing code ...

const createPendingBetsTableQuery = `
CREATE TABLE IF NOT EXISTS pending_bets (
  id SERIAL PRIMARY KEY,
  stake DECIMAL,
  odds DECIMAL,
  tipper VARCHAR(255),
  date DATE,
  sport VARCHAR(255),
  league VARCHAR(255),
  result VARCHAR(255),
  type VARCHAR(255)
);`;

pool
.query(createPendingBetsTableQuery)
.then(() => {
  console.log("Pending bets table created successfully");
})
.catch((err) => {
  console.error("Error creating the pending bets table:", err);
});

// ... existing code ...


module.exports = pool;
