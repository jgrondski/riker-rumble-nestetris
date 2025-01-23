import { useState, useEffect } from "react";
import PlayerColumn from "./PlayerColumn";
import PlayerTable from "./PlayerTable";
import TitleSection from "./TitleSection";
import TimerSection from "./TimerSection";
import ScoresCountdownRow from "./ScoresCountdownRow";
import {
  globalRootStyle,
  containerStyle,
  rowBaseStyle,
  upperContainerStyle, // NEW smaller-font container
} from "./RikerRumble.styles";

function RikerRumble() {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const [player1ScoreInput, setPlayer1ScoreInput] = useState("");
  const [player2ScoreInput, setPlayer2ScoreInput] = useState("");

  const [player1Scores, setPlayer1Scores] = useState([0, 0, 0]);
  const [player2Scores, setPlayer2Scores] = useState([0, 0, 0]);

  const [player1History, setPlayer1History] = useState([]);
  const [player2History, setPlayer2History] = useState([]);

  const [minutesInput, setMinutesInput] = useState("40");
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Score logic
  const addScore = (scoreInput, scores, setScores, history, setHistory) => {
    const newScore = parseInt(scoreInput, 10);
    if (!isNaN(newScore)) {
      const updatedScores = [...scores, newScore].sort((a, b) => b - a);
      const topThree = updatedScores.slice(0, 3);
      const tableChanged =
        topThree.length !== scores.length ||
        topThree.some((val, i) => val !== scores[i]);

      if (tableChanged) {
        if (history.length === 10) history.shift();
        history.push([...scores]);
        setHistory([...history]);
        setScores(topThree);
      }
    }
  };

  const handleUndo = (setScores, history, setHistory) => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setScores(previous);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  const handleClear = (scores, setScores, history, setHistory) => {
    const isAlreadyCleared =
      scores.length === 3 && scores.every((s) => s === 0);
    if (!isAlreadyCleared) {
      if (history.length === 10) {
        history.shift();
      }
      history.push([...scores]);
      setHistory([...history]);
      setScores([0, 0, 0]);
    }
  };

  const handleClearAll = () => {
    if (!player1Scores.every((s) => s === 0)) {
      if (player1History.length === 10) player1History.shift();
      player1History.push([...player1Scores]);
      setPlayer1History([...player1History]);
      setPlayer1Scores([0, 0, 0]);
    }
    if (!player2Scores.every((s) => s === 0)) {
      if (player2History.length === 10) player2History.shift();
      player2History.push([...player2Scores]);
      setPlayer2History([...player2History]);
      setPlayer2Scores([0, 0, 0]);
    }
  };

  const handlePlayer1Add = () => {
    addScore(
      player1ScoreInput,
      player1Scores,
      setPlayer1Scores,
      player1History,
      setPlayer1History
    );
    setPlayer1ScoreInput("");
  };

  const handlePlayer2Add = () => {
    addScore(
      player2ScoreInput,
      player2Scores,
      setPlayer2Scores,
      player2History,
      setPlayer2History
    );
    setPlayer2ScoreInput("");
  };

  // Timer
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const renderPlayer1Row = (_, i) => {
    const p1 = player1Scores[i];
    const p2 = player2Scores[i];
    const bg = p1 > p2 && p1 > 0 ? "#f51dff" : "black";
    return (
      <tr key={i}>
        <td style={{ ...rowBaseStyle, backgroundColor: bg }}>
          {p1.toLocaleString()}
        </td>
      </tr>
    );
  };

  const renderPlayer2Row = (_, i) => {
    const p1 = player1Scores[i];
    const p2 = player2Scores[i];
    const bg = p2 > p1 && p2 > 0 ? "#1d70ff" : "black";
    return (
      <tr key={i}>
        <td style={{ ...rowBaseStyle, backgroundColor: bg }}>
          {p2.toLocaleString()}
        </td>
      </tr>
    );
  };

  // Scores
  const player1Score = player1Scores.reduce((acc, p1, i) => {
    const p2 = player2Scores[i];
    return p1 > p2 && p1 > 0 ? acc + 1 : acc;
  }, 0);

  const player2Score = player2Scores.reduce((acc, p2, i) => {
    const p1 = player1Scores[i];
    return p2 > p1 && p2 > 0 ? acc + 1 : acc;
  }, 0);

  return (
    <div style={globalRootStyle}>
      {/* 1) A smaller font container for Timer + Player Info */}
      <div style={upperContainerStyle}>
        {/* Timer on top */}
        <TimerSection
          minutesInput={minutesInput}
          setMinutesInput={setMinutesInput}
          handleReset={handleReset}
          handleStartPause={handleStartPause}
          isRunning={isRunning}
          handleClearAll={handleClearAll}
        />

        {/* Player Info columns */}
        <div style={{ ...containerStyle, justifyContent: "center" }}>
          <PlayerColumn
            label="Player 1"
            playerName={player1Name}
            setPlayerName={setPlayer1Name}
            playerScoreInput={player1ScoreInput}
            setPlayerScoreInput={setPlayer1ScoreInput}
            onAdd={handlePlayer1Add}
            onClear={() =>
              handleClear(
                player1Scores,
                setPlayer1Scores,
                player1History,
                setPlayer1History
              )
            }
            onUndo={() =>
              handleUndo(
                (prevScores) => setPlayer1Scores(prevScores),
                player1History,
                setPlayer1History
              )
            }
            isRunning={isRunning}
          />

          <PlayerColumn
            label="Player 2"
            playerName={player2Name}
            setPlayerName={setPlayer2Name}
            playerScoreInput={player2ScoreInput}
            setPlayerScoreInput={setPlayer2ScoreInput}
            onAdd={handlePlayer2Add}
            onClear={() =>
              handleClear(
                player2Scores,
                setPlayer2Scores,
                player2History,
                setPlayer2History
              )
            }
            onUndo={() =>
              handleUndo(
                (prevScores) => setPlayer2Scores(prevScores),
                player2History,
                setPlayer2History
              )
            }
            isRunning={isRunning}
          />
        </div>
      </div>

      {/* 2) Title below the player info, above the tables */}
      <TitleSection />

      {/* 3) Player Tables */}
      <div style={{ ...containerStyle, justifyContent: "center" }}>
        <PlayerTable
          playerName={player1Name}
          rows={player1Scores.map((_, i) => renderPlayer1Row(_, i))}
        />
        <PlayerTable
          playerName={player2Name}
          rows={player2Scores.map((_, i) => renderPlayer2Row(_, i))}
        />
      </div>

      {/* 4) Scores + Countdown Row (normal font size) */}
      <ScoresCountdownRow
        p1Score={player1Score}
        p2Score={player2Score}
        timeString={formatTime(timeLeft)}
      />
    </div>
  );
}

export default RikerRumble;
