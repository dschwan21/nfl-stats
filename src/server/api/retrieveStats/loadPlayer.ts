import { type } from 'os';
import * as Papa from 'papaparse';

// Define types for the data you're fetching and sending to the frontend
interface PlayerStat {
  player_id: string;
  player_name: string;
  player_display_name: string;
  position: string;
  position_group: string;
  headshot_url: string;
  recent_team: string;
  season: number;
  week: number;
  season_type: string;
  completions: number;
  attempts: number;
  passing_yards: number;
  passing_tds: number;
  interceptions: number;
  sacks: number;
  sack_yards: number;
  sack_fumbles: number;
  sack_fumbles_lost: number;
  passing_air_yards: number;
  passing_yards_after_catch: number;
  passing_first_downs: number;
  passing_epa: number;
  passing_2pt_conversions: number;
  pacr: number;
  dakota: number;
  carries: number;
  rushing_yards: number;
  rushing_tds: number;
  rushing_fumbles: number;
  rushing_fumbles_lost: number;
  rushing_first_downs: number;
  rushing_epa: number;
  rushing_2pt_conversions: number;
  receptions: number;
  targets: number;
  receiving_yards: number;
  receiving_tds: number;
  receiving_fumbles: number;
  receiving_fumbles_lost: number;
  receiving_air_yards: number;
  receiving_yards_after_catch: number;
  receiving_first_downs: number;
  receiving_epa: number | null;
  receiving_2pt_conversions: number;
  racr: number | null;
  target_share: number | null;
  air_yards_share: number | null;
  wopr: number | null;
  special_teams_tds: number;
  fantasy_points: number;
  fantasy_points_ppr: number;
}

type PlayerStatArray = Array<PlayerStat>;


async function getPlayerStats(season?: number, player?: string, week?: number): Promise<PlayerStatArray> {
  const baseUrl = "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats.";
  const fileType = "csv";
  const url = `${baseUrl}${fileType}`;

  // Fetch the data from the URL
  const response = await fetch(url);
  const data = await response.text();

  // Parse the CSV data
  const result: unknown = Papa.parse(data, {
    header: true,
    dynamicTyping: true,
  });
  
  const playerStats = result.data.filter(row => row.player_display_name === player && row.week === week.toString() && row.season === season.toString()) as PlayerStatArray;
  

  return playerStats;
}

// Test the function
(async () => {
  const stats = await getPlayerStats(2021, "Justin Herbert", 4);
  console.log(stats);
})();
