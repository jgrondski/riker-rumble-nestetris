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
}) {
  return (
    <div style={columnStyle}>
      <div style={nameContainerStyle}>
        <label style={labelStyle}>{label} Name:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={scoreContainerStyle}>
        <label style={labelStyle}>{playerName} Score:</label>
        <input
          type="number"
          value={playerScoreInput}
          onChange={(e) => setPlayerScoreInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onAdd();
          }}
          style={inputStyle}
        />
      </div>
      <div style={buttonGroupStyle}>
        <button style={buttonStyle} onClick={onClear}>
          clear
        </button>
        <button style={buttonStyle} onClick={onUndo}>
          undo
        </button>
        <button style={buttonStyle} onClick={onAdd}>
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
};

export default PlayerColumn;
