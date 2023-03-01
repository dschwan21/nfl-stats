import Papa from "papaparse";
import 'ts-node/register';

interface Player {
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

async function getPlayerDataByName(name: string): Promise<Player | null> {
  const url = "https://github.com/nflverse/nflverse-data/releases/download/players/players.csv";

  const response = await fetch(url);
  const data = await response.text();

  const { data: playerData } = Papa.parse(data, {
    header: true,
    dynamicTyping: true,
  });

  const player = playerData.find((player: any) => player.name.toLowerCase() === name.toLowerCase());

  return player as Player;
}


// (async () => {
//   const player = await getPlayerDataByName("Tom Brady");
//   console.log(player);
// })();
