import { useState, useEffect } from "react";
import PlayerColumnsContainer from "./PlayerColumnsContainer";
import PlayerTablesContainer from "./PlayerTablesContainer";
import TitleSection from "./TitleSection";
import TimerSection from "./TimerSection";
import CountdownDisplay from "./CountdownDisplay";
import {
  globalRootStyle,
  upperContainerStyle,
  rowBaseStyle,
} from "./RikerRumble.styles";

function RikerRumble() {
  const [playerCount, setPlayerCount] = useState(2);

  // Store each player's data as an array
  const [players, setPlayers] = useState([
    { name: "Player 1", scoreInput: "", scores: [0, 0, 0], history: [] },
    { name: "Player 2", scoreInput: "", scores: [0, 0, 0], history: [] },
    { name: "Player 3", scoreInput: "", scores: [0, 0, 0], history: [] },
    { name: "Player 4", scoreInput: "", scores: [0, 0, 0], history: [] },
  ]);

  // Timer states
  const [minutesInput, setMinutesInput] = useState("40");
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // NEW: State for "# Of Scores" (default 3 for 2 players, 5 for 3/4 players)
  const [scoresCount, setScoresCount] = useState(playerCount >= 3 ? 5 : 3);

  // When playerCount changes, reset scoresCount AND minutes/timeLeft to defaults.
  useEffect(() => {
    setScoresCount(playerCount >= 3 ? 5 : 3);
    if (playerCount >= 3) {
      setMinutesInput("60");
      setTimeLeft(60 * 60);
    } else {
      setMinutesInput("40");
      setTimeLeft(40 * 60);
    }
  }, [playerCount]);

  const handlePlayerCountChange = (val) => setPlayerCount(parseInt(val, 10));
  const getTopN = () => scoresCount;

  // Single functions using playerIndex:
  const handleAddScore = (playerIndex) => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    const newScore = parseInt(player.scoreInput, 10);
    if (!isNaN(newScore)) {
      const updatedScores = [...player.scores, newScore].sort((a, b) => b - a);
      const sliced = updatedScores.slice(0, getTopN());
      if (
        sliced.length !== player.scores.length ||
        sliced.some((v, i) => v !== player.scores[i])
      ) {
        if (player.history.length === 10) player.history.shift();
        player.history.push([...player.scores]);
        player.scores = sliced;
      }
    }
    player.scoreInput = "";
    setPlayers(updatedPlayers);
  };

  const handleUndo = (playerIndex) => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    if (player.history.length > 0) {
      const previous = player.history[player.history.length - 1];
      player.scores = previous;
      player.history = player.history.slice(0, player.history.length - 1);
      setPlayers(updatedPlayers);
    }
  };

  const handleClear = (playerIndex) => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    const isAlreadyCleared = player.scores.every((s) => s === 0);
    if (!isAlreadyCleared) {
      if (player.history.length === 10) player.history.shift();
      player.history.push([...player.scores]);
      player.scores = new Array(getTopN()).fill(0);
      setPlayers(updatedPlayers);
    }
  };

  const handleClearAll = () => {
    for (let i = 0; i < playerCount; i++) {
      handleClear(i);
    }
  };

  const handleNameChange = (playerIndex, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].name = newName;
    setPlayers(updatedPlayers);
  };

  const handleScoreInputChange = (playerIndex, newVal) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].scoreInput = newVal;
    setPlayers(updatedPlayers);
  };

  // Timer logic
  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    const num = parseInt(minutesInput, 10);
    if (!isNaN(num)) {
      setTimeLeft(num * 60);
      setIsRunning(false);
    }
  };
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Example color function
  const colorFn = (playerIndex, val, i) => {
    for (let p = 0; p < playerCount; p++) {
      if (p === playerIndex) continue;
      if ((players[p].scores[i] || 0) >= val) {
        return "black";
      }
    }
    return ["#f51dff", "#1d70ff", "#1DB954", "#FF8C1D"][playerIndex];
  };

  const tableRows = (pIndex) => {
    const player = players[pIndex];
    const topN = getTopN();
    let rows;
    if (player.scores.length >= topN) {
      rows = player.scores.slice(0, topN);
    } else {
      rows = player.scores.concat(
        new Array(topN - player.scores.length).fill(0)
      );
    }
    return rows.map((val, i) => {
      const bg = colorFn(pIndex, val, i);
      return (
        <tr key={i}>
          <td style={{ ...rowBaseStyle, backgroundColor: bg }}>
            {val.toLocaleString()}
          </td>
        </tr>
      );
    });
  };

  const getScore = (pIndex) => {
    const player = players[pIndex];
    return player.scores.reduce((acc, val, i) => {
      const bg = colorFn(pIndex, val, i);
      return bg === "black" ? acc : acc + 1;
    }, 0);
  };

  return (
    <div style={globalRootStyle}>
      <div style={upperContainerStyle}>
        <TimerSection
          playerCount={playerCount}
          minutesInput={minutesInput}
          setMinutesInput={setMinutesInput}
          handleReset={handleReset}
          handleStartPause={handleStartPause}
          isRunning={isRunning}
          handleClearAll={handleClearAll}
          handlePlayerCountChange={handlePlayerCountChange}
          scoresCount={scoresCount}
          handleScoresCountChange={setScoresCount}
        />
        <PlayerColumnsContainer
          playerCount={playerCount}
          isRunning={isRunning}
          players={players}
          handleNameChange={handleNameChange}
          handleScoreInputChange={handleScoreInputChange}
          handleAddScore={handleAddScore}
          handleClear={handleClear}
          handleUndo={handleUndo}
        />
      </div>
      <TitleSection />
      <CountdownDisplay timeString={formatTime(timeLeft)} />
      <PlayerTablesContainer
        playerCount={playerCount}
        players={players}
        tableRows={tableRows}
        getScore={getScore}
      />
    </div>
  );
}

export default RikerRumble;
