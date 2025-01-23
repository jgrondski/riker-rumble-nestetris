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
} from "./RikerRumble.styles";

function TimerSection({
  minutesInput,
  setMinutesInput,
  handleReset,
  handleStartPause,
  isRunning,
  handleClearAll,
}) {
  const [playerCount, setPlayerCount] = useState("2");
  const startPauseLabel = isRunning ? "Pause" : "Start";

  return (
    <div style={timerSectionContainer}>
      <div style={resetAllScoresWrapper}>
        <button
          style={{
            ...buttonStyle,
            ...clearAllButtonStyle,
            width: "150px",
            height: "35px",
          }}
          onClick={handleClearAll}
          disabled={isRunning}
          onMouseDown={(e) => e.target.blur()}
        >
          Reset All Scores
        </button>
      </div>

      <div style={timerMiddleWrapper}>
        <button
          style={{
            ...buttonStyle,
            width: "60px",
            height: "35px",
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
              width: "120px",
              height: "35px",
              marginBottom: 0,
            }}
            disabled={isRunning}
            onMouseDown={(e) => e.target.blur()}
          />
        </div>

        <button
          style={{
            ...buttonStyle,
            ...clearAllButtonStyle,
            width: "px",
            height: "35px",
          }}
          onClick={handleStartPause}
          onMouseDown={(e) => e.target.blur()}
        >
          {startPauseLabel}
        </button>
      </div>

      <div style={playersDropdownWrapper}>
        <label
          style={{
            ...labelStyle,
            marginBottom: 0,
            textAlign: "center",
            position: "absolute",
            top: "-20px",
            left: 0,
            right: 0,
          }}
        >
          # Of Players
        </label>
        <select
          value={playerCount}
          onChange={(e) => setPlayerCount(e.target.value)}
          style={{
            width: "120px",
            height: "35px",
            textAlign: "center",
          }}
          disabled={true}
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
  minutesInput: PropTypes.string.isRequired,
  setMinutesInput: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleStartPause: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  handleClearAll: PropTypes.func.isRequired,
};

export default TimerSection;
