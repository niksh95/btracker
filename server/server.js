// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const betsRouter = require("./apis/bets") // Import the bets router
const pendingBetsRouter = require("./apis/pendingBets"); // Import the new router

app.use(express.json());
app.use(cors());
app.use("/pendingbets", pendingBetsRouter); // Add the new route for pending bets
// Use the bets router for managing bets
app.use("/bets", betsRouter);

app.listen(4000, () => console.log("Server on localhost:4000"));


