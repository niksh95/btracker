class PendingBet {
    constructor(id, stake, odds, tipper, date, sport, league, result, type) {
      this.id = id;
      this.stake = stake;
      this.odds = odds;
      this.tipper = tipper;
      this.date = date;
      this.sport = sport;
      this.league = league;
      this.result = result;
      this.type = type;
    }
}

module.exports = PendingBet;
