import PropTypes from "prop-types";
import {
  columnStyle,
  nameContainerStyle,
  labelStyle,
  inputStyle,
  scoreContainerStyle,
  buttonGroupStyle,
  buttonStyle,
} from "./RikerRumble.styles";

function PlayerColumn({
  label,
  playerName,
  setPlayerName,
  playerScoreInput,
  setPlayerScoreInput,
  onAdd,
  onClear,
  onUndo,
  isRunning,
}) {
  return (
    <div style={columnStyle}>
      <div style={nameContainerStyle}>
        <label style={labelStyle}>{label} Name:</label>
        {/* Player name input (NOT disabled anymore) */}
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={inputStyle}
          // removed disabled={isRunning}
        />
      </div>
      <div style={scoreContainerStyle}>
        <label style={labelStyle}>{playerName} Score:</label>
        {/* Player score input (NOT disabled anymore) */}
        <input
          type="number"
          value={playerScoreInput}
          onChange={(e) => setPlayerScoreInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onAdd();
          }}
          style={inputStyle}
          // removed disabled={isRunning}
        />
      </div>
      <div style={buttonGroupStyle}>
        {/* clear button can remain disabled if you want, or remove */}
        <button
          style={buttonStyle}
          onClick={onClear}
          disabled={isRunning}
          onMouseDown={(e) => e.target.blur()}
        >
          clear
        </button>

        {/* undo button (NOT disabled anymore) */}
        <button
          style={buttonStyle}
          onClick={onUndo}
          // removed disabled={isRunning}
          onMouseDown={(e) => e.target.blur()}
        >
          undo
        </button>

        <button
          style={buttonStyle}
          onClick={onAdd}
          onMouseDown={(e) => e.target.blur()}
        >
          add
        </button>
      </div>
    </div>
  );
}

PlayerColumn.propTypes = {
  label: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  setPlayerName: PropTypes.func.isRequired,
  playerScoreInput: PropTypes.string.isRequired,
  setPlayerScoreInput: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default PlayerColumn;
