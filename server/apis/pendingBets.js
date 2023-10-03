const express = require("express");
const router = express.Router();
const PendingBet = require("../models/pendingBet");
const pool = require("../database");

router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM pending_bets")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error("Error fetching pending bets:", error);
      res.status(500).json({ error: "An error occurred while fetching pending bets." });
    });
});

router.post("/", (req, res) => {
  const { stake, odds, tipper, date, sport, league, result, type } = req.body;

  const newPendingBet = new PendingBet(null, stake, odds, tipper, date, sport, league, result, type);

  pool
    .query(
      "INSERT INTO pending_bets (stake, odds, tipper, date, sport, league, result, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [newPendingBet.stake, newPendingBet.odds, newPendingBet.tipper, newPendingBet.date, newPendingBet.sport, newPendingBet.league, newPendingBet.result, newPendingBet.type]
    )
    .then((result) => {
      const createdPendingBet = result.rows[0];
      res.status(201).json(createdPendingBet);
    })
    .catch((error) => {
      console.error("Error creating pending bet:", error);
      res.status(500).json({ error: "An error occurred while creating the pending bet." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;  // Extract the ID from the request parameters

  pool
    .query("DELETE FROM pending_bets WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        // No rows were deleted, meaning the ID did not exist in the table
        res.status(404).json({ message: "Pending bet not found." });
      } else {
        const deletedPendingBet = result.rows[0];
        res.json(deletedPendingBet);
      }
    })
    .catch((error) => {
      console.error("Error deleting pending bet:", error);
      res.status(500).json({ error: "An error occurred while deleting the pending bet." });
    });
});

// Similar logic for put and delete routes...

module.exports = router;
