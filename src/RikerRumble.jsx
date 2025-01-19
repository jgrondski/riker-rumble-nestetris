import { useState } from "react";

function App() {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const [player1ScoreInput, setPlayer1ScoreInput] = useState("");
  const [player2ScoreInput, setPlayer2ScoreInput] = useState("");

  const [player1Scores, setPlayer1Scores] = useState([0, 0, 0]);
  const [player2Scores, setPlayer2Scores] = useState([0, 0, 0]);

  const [player1History, setPlayer1History] = useState([]);
  const [player2History, setPlayer2History] = useState([]);

  const COLUMN_WIDTH = 300;
  const CONTENT_WIDTH = 250;
  const ELEMENT_HEIGHT = 35;

  const containerStyle = {
    display: "flex",
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
  };

  const columnStyle = {
    width: `${COLUMN_WIDTH}px`,
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const inputStyle = {
    width: `${CONTENT_WIDTH}px`,
    height: `${ELEMENT_HEIGHT}px`,
    boxSizing: "border-box",
    marginBottom: "5px",
    textAlign: "center",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "10px",
    width: `${CONTENT_WIDTH}px`,
    marginBottom: "20px",
  };

  const buttonStyle = {
    flex: 1,
    height: `${ELEMENT_HEIGHT}px`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const middleSectionStyle = {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  };

  const tableStyle = {
    margin: "0 auto",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
    width: `${CONTENT_WIDTH}px`,
  };

  const thStyle = {
    border: "1px solid #ccc",
    padding: "5px",
    backgroundColor: "black",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  };

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

  const handleUndo = (scores, setScores, history, setHistory) => {
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
      if (history.length === 10) history.shift();
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

  const renderPlayer1Row = (score, index) => {
    const p1 = player1Scores[index];
    const p2 = player2Scores[index];
    const bg = p1 > p2 && p1 > 0 ? "#f51dff" : "black";

    return (
      <tr key={index}>
        <td
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            backgroundColor: bg,
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {p1.toLocaleString()}
        </td>
      </tr>
    );
  };

  const renderPlayer2Row = (score, index) => {
    const p1 = player1Scores[index];
    const p2 = player2Scores[index];
    const bg = p2 > p1 && p2 > 0 ? "#1d70ff" : "black";

    return (
      <tr key={index}>
        <td
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            backgroundColor: bg,
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {p2.toLocaleString()}
        </td>
      </tr>
    );
  };

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background-color: black;
          height: 100%;
        }
      `}</style>
      <div style={{ minHeight: "100vh", color: "white" }}>
        <div style={containerStyle}>
          <div style={columnStyle}>
            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Player 1 Name:</label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "5px" }}>
              <label style={labelStyle}>Player {player1Name} Score:</label>
              <input
                type="number"
                value={player1ScoreInput}
                onChange={(e) => setPlayer1ScoreInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePlayer1Add();
                }}
                style={inputStyle}
              />
            </div>
            <div style={buttonGroupStyle}>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleClear(
                    player1Scores,
                    setPlayer1Scores,
                    player1History,
                    setPlayer1History
                  )
                }
              >
                clear
              </button>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleUndo(
                    player1Scores,
                    setPlayer1Scores,
                    player1History,
                    setPlayer1History
                  )
                }
              >
                undo
              </button>
              <button style={buttonStyle} onClick={handlePlayer1Add}>
                add
              </button>
            </div>
          </div>
          <div style={columnStyle}>
            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Player 2 Name:</label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "5px" }}>
              <label style={labelStyle}>Player {player2Name} Score:</label>
              <input
                type="number"
                value={player2ScoreInput}
                onChange={(e) => setPlayer2ScoreInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePlayer2Add();
                }}
                style={inputStyle}
              />
            </div>
            <div style={buttonGroupStyle}>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleClear(
                    player2Scores,
                    setPlayer2Scores,
                    player2History,
                    setPlayer2History
                  )
                }
              >
                clear
              </button>
              <button
                style={buttonStyle}
                onClick={() =>
                  handleUndo(
                    player2Scores,
                    setPlayer2Scores,
                    player2History,
                    setPlayer2History
                  )
                }
              >
                undo
              </button>
              <button style={buttonStyle} onClick={handlePlayer2Add}>
                add
              </button>
            </div>
          </div>
        </div>

        <div style={middleSectionStyle}>
          <button
            style={{
              ...buttonStyle,
              width: "120px",
              margin: "0 auto",
              marginBottom: "20px",
              backgroundColor: "gray",
              border: "1px solid #ccc",
            }}
            onClick={handleClearAll}
          >
            Clear All
          </button>
          <h1 className="ribeye-marrow-regular" style={headingStyle}>
            Riker Rumble
          </h1>
        </div>

        <div style={containerStyle}>
          <div style={columnStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th className="ribeye-marrow-regular" style={thStyle}>
                    {player1Name}
                  </th>
                </tr>
              </thead>
              <tbody>{player1Scores.map(renderPlayer1Row)}</tbody>
            </table>
          </div>

          <div style={columnStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th className="ribeye-marrow-regular" style={thStyle}>
                    {player2Name}
                  </th>
                </tr>
              </thead>
              <tbody>{player2Scores.map(renderPlayer2Row)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
