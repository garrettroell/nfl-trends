function gameDataToFantasyPoints(gameData, pointsPerReception) {
  let fantasyPoints =
    6 * gameData.rush_td +
    6 * gameData.rec_td +
    4 * gameData.pass_td +
    0.1 * gameData.rush_yds +
    0.1 * gameData.rec_yds +
    0.04 * gameData.pass_yds +
    pointsPerReception * gameData.rec -
    2 * gameData.pass_int -
    2 * gameData.fumbles_lost;

  return parseFloat(fantasyPoints.toFixed(2));
}

export { gameDataToFantasyPoints };
