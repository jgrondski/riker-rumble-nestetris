import { useState } from "react";
import PropTypes from "prop-types";
import {
  labelStyle,
  inputStyle,
  buttonStyle,
  clearAllButtonStyle,
  timerSectionContainer,
  resetAllScoresWrapper,
  timerMiddleWrapper,
  timerInputWrapper,
  playersDropdownWrapper,
  // Newly extracted local style constants
  timerSectionOuterContainerStyle,
  resetAllButtonStyle,
  applyButtonStyle,
  minutesInputStyle,
  startPauseButtonStyle,
  dropdownStyle,
} from "./RikerRumble.styles";

/**
 * TimerSection:
 * - Shifts horizontally depending on playerCount to remain centered
 *   with the Player columns / tables when 3 or 4 players.
 * - All inline styles have been moved into RikerRumble.styles.js
 */
function TimerSection({
  playerCount,
  minutesInput,
  setMinutesInput,
  handleReset,
  handleStartPause,
  isRunning,
  handleClearAll,
  handlePlayerCountChange,
}) {
  const [localCount, setLocalCount] = useState("2");
  const startPauseLabel = isRunning ? "Pause" : "Start";

  const onDropdownChange = (e) => {
    const newValue = e.target.value;
    setLocalCount(newValue);
    handlePlayerCountChange(newValue);
  };

  // Decide the shift: 3 players => ~120px, 4 players => ~240px, else 0
  const marginLeft =
    playerCount === 3 ? "120px" : playerCount === 4 ? "240px" : "0px";

  // Combine base container + dynamic margin-left
  const containerStyle = {
    ...timerSectionContainer,
    ...timerSectionOuterContainerStyle, // ensures we have the "transition: margin-left 0.3s"
    marginLeft,
  };

  return (
    <div style={containerStyle}>
      {/* LEFT: Reset All Scores */}
      <div style={resetAllScoresWrapper}>
        <button
          style={{
            ...buttonStyle,
            ...clearAllButtonStyle,
            ...resetAllButtonStyle,
          }}
          onClick={handleClearAll}
          disabled={isRunning}
          onMouseDown={(e) => e.target.blur()}
        >
          Reset All Scores
        </button>
      </div>

      {/* MIDDLE: Apply, Minutes, Start */}
      <div style={timerMiddleWrapper}>
        <button
          style={{
            ...buttonStyle,
            ...applyButtonStyle,
          }}
          onClick={handleReset}
          disabled={isRunning}
          onMouseDown={(e) => e.target.blur()}
        >
          Apply
        </button>

        <div style={timerInputWrapper}>
          <label
            style={{
              ...labelStyle,
              marginBottom: 0,
              position: "absolute",
              textAlign: "center",
              top: "-20px",
              left: 0,
              right: 0,
            }}
          >
            Minutes
          </label>
          <input
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            style={{
              ...inputStyle,
              ...minutesInputStyle,
            }}
            disabled={isRunning}
            onMouseDown={(e) => e.target.blur()}
          />
        </div>

        <button
          style={{
            ...buttonStyle,
            ...clearAllButtonStyle,
            ...startPauseButtonStyle,
          }}
          onClick={handleStartPause}
          onMouseDown={(e) => e.target.blur()}
        >
          {startPauseLabel}
        </button>
      </div>

      {/* RIGHT: # Of Players */}
      <div style={playersDropdownWrapper}>
        <label
          style={{
            ...labelStyle,
            marginBottom: 0,
            position: "absolute",
            textAlign: "center",
            top: "-20px",
            left: 0,
            right: 0,
          }}
        >
          # Of Players
        </label>
        <select
          value={localCount}
          onChange={onDropdownChange}
          style={dropdownStyle}
          onMouseDown={(e) => e.target.blur()}
        >
          <option value="2">2 Players</option>
          <option value="3">3 Players</option>
          <option value="4">4 Players</option>
        </select>
      </div>
    </div>
  );
}

TimerSection.propTypes = {
  playerCount: PropTypes.number.isRequired,
  minutesInput: PropTypes.string.isRequired,
  setMinutesInput: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleStartPause: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  handleClearAll: PropTypes.func.isRequired,
  handlePlayerCountChange: PropTypes.func.isRequired,
};

export default TimerSection;
