import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  // player searchbar state
  const [playerList, setPlayerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  // search player state
  const [season, setSeason] = useState<number>(0);
  const [player, setPlayer] = useState("");
  const [week, setWeek] = useState<number>(0);

  const getPlayerStats = api.player.getPlayerStats.useQuery({
    season: parseInt(String(season), 10),
    player: player,
    week: parseInt(String(week), 10)
  });
  console.log('season',season,'player',player,'week',typeof(week));
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* ... */}
          <div className="flex flex-col gap-4">
            <label htmlFor="season" className="text-white text-lg">
              Season
            </label>
            <input
              type="number"
              id="season"
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="player" className="text-white text-lg">
              Player
            </label>
            <input
              type="text"
              id="player"
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="week" className="text-white text-lg">
              Week
            </label>
            <input
              type="number"
              id="week"
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white"
            />
          </div>
          <button
            className="px-4 py-2 rounded-md bg-white/10 text-white"
            onClick={() =>getPlayerStats}
          >
            Get Player Stats
          </button>
          {/* ... */}
        </div>
          
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};



