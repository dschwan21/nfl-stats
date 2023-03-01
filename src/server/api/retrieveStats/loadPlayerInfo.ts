import { parse, Parser } from "csv-parse";
import { unknown } from "zod";

export interface PlayerBio {
    status: string;
    display_name: string;
    first_name: string;
    last_name: string;
    esb_id: string;
    gsis_id: string;
    birth_date: string;
    college_name: string;
    position_group: string;
    position: string;
    jersey_number: string;
    height: string;
    weight: string;
    team_abbr: string;
    team_seq: string;
    current_team_id: string;
    football_name: string;
    gsis_it_id: string;
    smart_id: string;
    headshot: string;
    short_name: string;
    entry_year: string;
    rookie_year: string;
    draft_club: string;
    draft_number: string;
    college_conference: string;
    status_description_abbr: string;
    status_short_description: string;
    uniform_number: string;
    suffix: string;
    draft_round: string;
    season: string;
  }
  

  async function getPlayerInfo(): Promise<PlayerBio[]> {
    const baseUrl =
      "https://github.com/nflverse/nflverse-data/releases/download/players/players.";
    const fileType = "csv";
    const url = `${baseUrl}${fileType}`;
  
    // Fetch the data from the URL
    const response = await fetch(url);
    const data = await response.text();
  
    // Parse the CSV data
    const records = await new Promise<PlayerBio[]>((resolve, reject) => {
      parse(data, {
        columns: true,
        cast: true,
      }, (err, records: PlayerBio[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(records);
        }
      });
    });
    console.log('BioRECORDS', records)
  
    // Filter the data to include only the specified season
    // const stats = records.filter((row) => row.season === season);
  
    // const playerBio = records.filter(
    //   (row) =>
    //     row.player_display_name === player &&
    //     row.week === week &&
    //     row.season === season
    // );
    //   // console.log('PlayerBio', playerBio)
    // return playerStats;
    return records;
  }


  export default getPlayerInfo;