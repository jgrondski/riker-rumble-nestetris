import PropTypes from "prop-types";
import PlayerColumn from "./PlayerColumn";
import { containerStyle } from "./RikerRumble.styles";

function PlayerColumnsContainer({
  playerCount,
  isRunning,
  players,
  handleNameChange,
  handleScoreInputChange,
  handleAddScore,
  handleClear,
  handleUndo,
}) {
  const columns = [];
  for (let i = 0; i < playerCount; i++) {
    const p = players[i];
    columns.push(
      <PlayerColumn
        key={i}
        label={`Player ${i + 1}`}
        playerName={p.name}
        setPlayerName={(val) => handleNameChange(i, val)}
        playerScoreInput={p.scoreInput}
        setPlayerScoreInput={(val) => handleScoreInputChange(i, val)}
        onAdd={() => handleAddScore(i)}
        onClear={() => handleClear(i)}
        onUndo={() => handleUndo(i)}
        isRunning={isRunning}
      />
    );
  }

  return (
    <div style={{ ...containerStyle, justifyContent: "center" }}>{columns}</div>
  );
}

PlayerColumnsContainer.propTypes = {
  playerCount: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      scoreInput: PropTypes.string.isRequired,
      scores: PropTypes.arrayOf(PropTypes.number).isRequired,
      history: PropTypes.array.isRequired,
    })
  ).isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleScoreInputChange: PropTypes.func.isRequired,
  handleAddScore: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};

export default PlayerColumnsContainer;
