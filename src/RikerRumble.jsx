import { useState, useEffect } from "react";
import PlayerColumn from "./PlayerColumn";
import PlayerTable from "./PlayerTable";
import TitleSection from "./TitleSection";
import TimerSection from "./TimerSection";
import CountdownDisplay from "./CountdownDisplay";
import {
  globalRootStyle,
  containerStyle,
  rowBaseStyle,
  upperContainerStyle,
} from "./RikerRumble.styles";

function RikerRumble() {
  const [playerCount, setPlayerCount] = useState(2);

  // -- Player 1 --
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player1ScoreInput, setPlayer1ScoreInput] = useState("");
  const [player1Scores, setPlayer1Scores] = useState([0, 0, 0]);
  const [player1History, setPlayer1History] = useState([]);

  // -- Player 2 --
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [player2ScoreInput, setPlayer2ScoreInput] = useState("");
  const [player2Scores, setPlayer2Scores] = useState([0, 0, 0]);
  const [player2History, setPlayer2History] = useState([]);

  // -- Player 3 (optional) --
  const [player3Name, setPlayer3Name] = useState("Player 3");
  const [player3ScoreInput, setPlayer3ScoreInput] = useState("");
  const [player3Scores, setPlayer3Scores] = useState([0, 0, 0]);
  const [player3History, setPlayer3History] = useState([]);

  // -- Player 4 (optional) --
  const [player4Name, setPlayer4Name] = useState("Player 4");
  const [player4ScoreInput, setPlayer4ScoreInput] = useState("");
  const [player4Scores, setPlayer4Scores] = useState([0, 0, 0]);
  const [player4History, setPlayer4History] = useState([]);

  // -- Timer --
  const [minutesInput, setMinutesInput] = useState("40");
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const handlePlayerCountChange = (val) => setPlayerCount(parseInt(val, 10));

  // Choose how many top scores to keep (and show in tables)
  const getTopN = () => {
    if (playerCount === 3) return 4;
    if (playerCount === 4) return 5;
    // default for 2 players
    return 3;
  };

  // Modified addScore to keep topN
  const addScore = (scoreInput, scores, setScores, history, setHistory) => {
    const newScore = parseInt(scoreInput, 10);
    if (!isNaN(newScore)) {
      const updated = [...scores, newScore].sort((a, b) => b - a);
      const sliced = updated.slice(0, getTopN());
      if (
        sliced.length !== scores.length ||
        sliced.some((v, i) => v !== scores[i])
      ) {
        if (history.length === 10) history.shift();
        history.push([...scores]);
        setHistory([...history]);
        setScores(sliced);
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
    const isAlreadyCleared = scores.every((s) => s === 0);
    if (!isAlreadyCleared) {
      if (history.length === 10) history.shift();
      history.push([...scores]);
      setHistory([...history]);
      setScores(new Array(getTopN()).fill(0));
    }
  };

  const handleClearAll = () => {
    const doClear = (scores, setScores, history, setHistory) => {
      if (!scores.every((s) => s === 0)) {
        if (history.length === 10) history.shift();
        history.push([...scores]);
        setHistory([...history]);
        setScores(new Array(getTopN()).fill(0));
      }
    };
    doClear(player1Scores, setPlayer1Scores, player1History, setPlayer1History);
    doClear(player2Scores, setPlayer2Scores, player2History, setPlayer2History);
    if (playerCount >= 3) {
      doClear(
        player3Scores,
        setPlayer3Scores,
        player3History,
        setPlayer3History
      );
    }
    if (playerCount === 4) {
      doClear(
        player4Scores,
        setPlayer4Scores,
        player4History,
        setPlayer4History
      );
    }
  };

  // Add callbacks: after calling addScore, we clear the input
  const handlePlayer1Add = () => {
    addScore(
      player1ScoreInput,
      player1Scores,
      setPlayer1Scores,
      player1History,
      setPlayer1History
    );
    setPlayer1ScoreInput(""); // clear the input
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
  const handlePlayer3Add = () => {
    addScore(
      player3ScoreInput,
      player3Scores,
      setPlayer3Scores,
      player3History,
      setPlayer3History
    );
    setPlayer3ScoreInput("");
  };
  const handlePlayer4Add = () => {
    addScore(
      player4ScoreInput,
      player4Scores,
      setPlayer4Scores,
      player4History,
      setPlayer4History
    );
    setPlayer4ScoreInput("");
  };

  // Timer
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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // color checks for each row (we'll do them in the table generator)
  const colorP1 = (val, i) => {
    const p2 = player2Scores[i] || 0;
    const p3 = player3Scores[i] || 0;
    const p4 = player4Scores[i] || 0;
    return val > p2 && val > p3 && val > p4 ? "#f51dff" : "black";
  };
  const colorP2 = (val, i) => {
    const p1 = player1Scores[i] || 0;
    const p3 = player3Scores[i] || 0;
    const p4 = player4Scores[i] || 0;
    return val > p1 && val > p3 && val > p4 ? "#1d70ff" : "black";
  };
  const colorP3 = (val, i) => {
    const p1 = player1Scores[i] || 0;
    const p2 = player2Scores[i] || 0;
    const p4 = player4Scores[i] || 0;
    return val > p1 && val > p2 && val > p4 ? "#1DB954" : "black";
  };
  const colorP4 = (val, i) => {
    const p1 = player1Scores[i] || 0;
    const p2 = player2Scores[i] || 0;
    const p3 = player3Scores[i] || 0;
    return val > p1 && val > p2 && val > p3 ? "#FF8C1D" : "black";
  };

  const getPlayerScore = (scores, colorFn) =>
    scores.reduce((acc, val, i) => {
      const bg = colorFn(val, i);
      return bg === "black" ? acc : acc + 1;
    }, 0);

  // tableRows: to fill up the table with topN
  const tableRows = (scores, colorFn) => {
    const topN = getTopN();
    const padded = scores.concat(new Array(topN - scores.length).fill(0));
    return padded.map((val, i) => {
      const bg = colorFn(val, i);
      return (
        <tr key={i}>
          <td style={{ ...rowBaseStyle, backgroundColor: bg }}>
            {val.toLocaleString()}
          </td>
        </tr>
      );
    });
  };

  return (
    <div style={globalRootStyle}>
      <div style={upperContainerStyle}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TimerSection
            minutesInput={minutesInput}
            setMinutesInput={setMinutesInput}
            handleReset={handleReset}
            handleStartPause={handleStartPause}
            isRunning={isRunning}
            handleClearAll={handleClearAll}
            handlePlayerCountChange={handlePlayerCountChange}
          />
        </div>

        <div style={{ ...containerStyle, justifyContent: "center" }}>
          {/* Player 1 */}
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
              handleUndo(setPlayer1Scores, player1History, setPlayer1History)
            }
            isRunning={isRunning}
          />

          {/* Player 2 */}
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
              handleUndo(setPlayer2Scores, player2History, setPlayer2History)
            }
            isRunning={isRunning}
          />

          {/* Player 3 if 3 or 4 players */}
          {playerCount >= 3 && (
            <PlayerColumn
              label="Player 3"
              playerName={player3Name}
              setPlayerName={setPlayer3Name}
              playerScoreInput={player3ScoreInput}
              setPlayerScoreInput={setPlayer3ScoreInput}
              onAdd={handlePlayer3Add}
              onClear={() =>
                handleClear(
                  player3Scores,
                  setPlayer3Scores,
                  player3History,
                  setPlayer3History
                )
              }
              onUndo={() =>
                handleUndo(setPlayer3Scores, player3History, setPlayer3History)
              }
              isRunning={isRunning}
            />
          )}

          {/* Player 4 if 4 players */}
          {playerCount === 4 && (
            <PlayerColumn
              label="Player 4"
              playerName={player4Name}
              setPlayerName={setPlayer4Name}
              playerScoreInput={player4ScoreInput}
              setPlayerScoreInput={setPlayer4ScoreInput}
              onAdd={handlePlayer4Add}
              onClear={() =>
                handleClear(
                  player4Scores,
                  setPlayer4Scores,
                  player4History,
                  setPlayer4History
                )
              }
              onUndo={() =>
                handleUndo(setPlayer4Scores, player4History, setPlayer4History)
              }
              isRunning={isRunning}
            />
          )}
        </div>
      </div>

      {/* Title (centered) */}
      <div style={{ textAlign: "center" }}>
        <TitleSection />
      </div>

      {/* Countdown timer below the title, above the tables, still centered */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <CountdownDisplay timeString={formatTime(timeLeft)} />
      </div>

      {/* Tables + Score beneath each table */}
      <div
        style={{
          ...containerStyle,
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {/* Player 1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PlayerTable
            playerName={player1Name}
            rows={tableRows(player1Scores, colorP1)}
          />
          <div
            className="ribeye-marrow-regular"
            style={{ fontSize: "2em", marginTop: "10px" }}
          >
            {getPlayerScore(player1Scores, colorP1)}
          </div>
        </div>

        {/* Player 2 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PlayerTable
            playerName={player2Name}
            rows={tableRows(player2Scores, colorP2)}
          />
          <div
            className="ribeye-marrow-regular"
            style={{ fontSize: "2em", marginTop: "10px" }}
          >
            {getPlayerScore(player2Scores, colorP2)}
          </div>
        </div>

        {/* Player 3 if 3+ */}
        {playerCount >= 3 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PlayerTable
              playerName={player3Name}
              rows={tableRows(player3Scores, colorP3)}
            />
            <div
              className="ribeye-marrow-regular"
              style={{ fontSize: "2em", marginTop: "10px" }}
            >
              {getPlayerScore(player3Scores, colorP3)}
            </div>
          </div>
        )}

        {/* Player 4 if 4 */}
        {playerCount === 4 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PlayerTable
              playerName={player4Name}
              rows={tableRows(player4Scores, colorP4)}
            />
            <div
              className="ribeye-marrow-regular"
              style={{ fontSize: "2em", marginTop: "10px" }}
            >
              {getPlayerScore(player4Scores, colorP4)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RikerRumble;
