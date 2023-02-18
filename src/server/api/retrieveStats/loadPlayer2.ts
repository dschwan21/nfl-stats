import { parse, Parser } from "csv-parse";
import { unknown } from "zod";

interface PlayerStat {
  season: number;
  week: number;
  player_display_name: string;
  position: string;
  team: string;
  opp: string;
  game_date: string;
  home_or_away: string;
  passing_yards: number;
  passing_tds: number;
  interceptions: number;
  rushing_yards: number;
  rushing_tds: number;
  receiving_yards: number;
  receiving_tds: number;
  targets: number;
  receptions: number;
  fumbles_lost: number;
  two_point_conversions: number;
  made_field_goals: number;
  missed_field_goals: number;
  made_extra_points: number;
  missed_extra_points: number;
  defensive_sacks: number;
  defensive_interceptions: number;
  fumbles_recovered: number;
  safeties: number;
  defensive_tds: number;
  punt_return_tds: number;
  kickoff_return_tds: number;
  other_tds: number;
  points_allowed: number;
  yards_allowed: number;
}

async function getPlayerStats(
  season: number,
  player: string,
  week: number
): Promise<PlayerStat[]> {
  const baseUrl =
    "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats.";
  const fileType = "csv";
  const url = `${baseUrl}${fileType}`;

  // Fetch the data from the URL
  const response = await fetch(url);
  const data = await response.text();

  // Parse the CSV data
  const records = await new Promise<PlayerStat[]>((resolve, reject) => {
    parse(data, {
      columns: true,
      cast: true,
    }, (err, records: PlayerStat[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
  // console.log('RECORDS', records)

  // Filter the data to include only the specified season
  // const stats = records.filter((row) => row.season === season);

  const playerStats = records.filter(
    (row) =>
      row.player_display_name === player &&
      row.week === week &&
      row.season === season
  );
    console.log('PLAYERSTATS', playerStats)
  return playerStats;
}

export default getPlayerStats;