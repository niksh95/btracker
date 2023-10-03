// bets.js
const express = require("express");
const router = express.Router();
const Bet = require("../models/bet"); // Import the Bet model
const pool = require("../database"); // Import the database connection

// Define routes for handling bets
router.get("/", (req, res) => {
  // Implement logic to fetch and return a list of bets from the database
  pool
    .query("SELECT * FROM bets")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error("Error fetching bets:", error);
      res.status(500).json({ error: "An error occurred while fetching bets." });
    });
});

router.post("/", (req, res) => {
  const { stake, odds, tipper, date, sport, league, result, type } = req.body;

  // Create a new Bet instance
  const newBet = new Bet(
    null,
    stake,
    odds,
    tipper,
    date,
    sport,
    league,
    result,
    type
  );

  // Implement logic to save the new bet to the database
  pool
    .query(
      "INSERT INTO bets (stake, odds, tipper, date, sport, league, result, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        newBet.stake,
        newBet.odds,
        newBet.tipper,
        newBet.date,
        newBet.sport,
        newBet.league,
        newBet.result,
        newBet.type,
      ]
    )
    .then((result) => {
      const createdBet = result.rows[0];
      res.status(201).json(createdBet);
    })
    .catch((error) => {
      console.error("Error creating bet:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the bet." });
    });
});

router.put("/:id", (req, res) => {
  const betId = req.params.id;

  // Get the bet from the database
  pool
    .query("SELECT * FROM bets WHERE id = $1", [betId])
    .then((result) => {
      const bet = result.rows[0];

      // Update the bet result
      bet.result = req.body.result;

      // Implement logic to save the updated bet to the database
      pool
        .query("UPDATE bets SET result = $1 WHERE id = $2", [bet.result, betId])
        .then(() => {
          res.status(204).send(); // 204 No Content indicates successful update
        })
        .catch((error) => {
          console.error("Error updating bet:", error);
          res
            .status(500)
            .json({ error: "An error occurred while updating the bet." });
        });
    })
    .catch((error) => {
      console.error("Error fetching bet:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the bet." });
    });
});

router.delete("/:id", (req, res) => {
  const betId = req.params.id;

  // Implement logic to delete the bet from the database by ID
  pool
    .query("DELETE FROM bets WHERE id = $1", [betId])
    .then(() => {
      res.status(204).send(); // 204 No Content indicates successful deletion
    })
    .catch((error) => {
      console.error("Error deleting bet:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the bet." });
    });
});

module.exports = router;
