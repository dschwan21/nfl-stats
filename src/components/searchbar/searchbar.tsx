import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { PlayerBio } from "../../server/api/retrieveStats/loadPlayerInfo";


interface SearchBarProps {
  onSelect: (player: PlayerBio) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [playerList, setPlayerList] = useState<PlayerBio[]>([]);

  interface PlayerListQueryResult {
    data: PlayerBio[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  }

  // useEffect(() => {
  //   const getPlayerList = async () => {
  //     try {
  //       const { data } = await api.player.getPlayerInfo.useQuery().toPromise() as { data: PlayerBio[] };
  //       console.log('Player list:', data);
  //       setPlayerList(data);
  //     } catch (error) {
  //       console.error('Error fetching player list:', error);
  //     }
  //   };

  //   getPlayerList().catch((error) => {console.log(error)});
  // }, []);
  const getPlayerList = () => {
    try {
      const { data }: { data?: PlayerBio[] } =  api.player.getPlayerInfo.useQuery()!;
      console.log('Player list helooooo:', data);
      setPlayerList(data as PlayerBio[]);
    } catch (error) {
      console.error('Error fetching player list:', error);
    }
  };
  

  useEffect(() => {
    console.log('useEffect');
    
  
    getPlayerList()
  }, []);

  console.log('playersList', playerList);

  // const filteredPlayers = playerList.filter(
  //   (player) =>
  //     player.firstName.toLowerCase().startsWith(query.toLowerCase()) ||
  //     player.lastName.toLowerCase().startsWith(query.toLowerCase())
  // );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        hi
        {/* {filteredPlayers.map((player, index) => (
          <li key={index} onClick={() => onSelect(player)}>
            {player.firstName} {player.lastName}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default SearchBar;
