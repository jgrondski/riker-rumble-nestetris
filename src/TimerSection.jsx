import { useState, useEffect } from "react";
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
  timerSectionOuterContainerStyle,
  resetAllButtonStyle,
  applyButtonStyle,
  minutesInputStyle,
  startPauseButtonStyle,
  scoresCountWrapperStyle,
  scoresCountLabelStyle,
  scoresCountInputStyle,
  scoresCountApplyButtonStyle,
} from "./RikerRumble.styles";

function TimerSection({
  playerCount,
  minutesInput,
  setMinutesInput,
  handleReset,
  handleStartPause,
  isRunning,
  handleClearAll,
  handlePlayerCountChange,
  scoresCount,
  handleScoresCountChange,
}) {
  const [localPlayerCount, setLocalPlayerCount] = useState(String(playerCount));
  const [localScoresCount, setLocalScoresCount] = useState(String(scoresCount));
  const startPauseLabel = isRunning ? "Pause" : "Start";

  // When playerCount prop changes, update localScoresCount to the new default.
  useEffect(() => {
    const defaultScores = playerCount >= 3 ? "5" : "3";
    setLocalScoresCount(defaultScores);
  }, [playerCount]);

  const onPlayerCountChange = (e) => {
    let newValue = e.target.value;
    if (newValue === "") {
      setLocalPlayerCount("");
      return;
    }
    const num = parseInt(newValue, 10);
    if (num < 2) newValue = "2";
    if (num > 4) newValue = "4";
    setLocalPlayerCount(newValue);
    handlePlayerCountChange(newValue);
  };

  const onScoresCountChange = (e) => {
    setLocalScoresCount(e.target.value);
  };

  const onScoresCountApply = () => {
    const num = parseInt(localScoresCount, 10);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      handleScoresCountChange(num);
    } else {
      setLocalScoresCount(String(scoresCount));
    }
  };

  // Determine horizontal shift based on playerCount
  const marginLeft =
    playerCount === 3 ? "30px" : playerCount === 4 ? "150px" : "0px";

  const containerCombinedStyle = {
    ...timerSectionContainer,
    ...timerSectionOuterContainerStyle,
    marginLeft,
  };

  return (
    <div style={containerCombinedStyle}>
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
          style={{ ...buttonStyle, ...applyButtonStyle }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleReset();
            }}
            style={{ ...inputStyle, ...minutesInputStyle }}
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

      {/* RIGHT: Now an integer input for "# Of Players" */}
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
        <input
          type="number"
          value={localPlayerCount}
          onChange={onPlayerCountChange}
          style={scoresCountInputStyle}
          min="2"
          max="4"
          onMouseDown={(e) => e.target.blur()}
        />
      </div>

      {/* NEW: # Of Scores */}
      <div style={scoresCountWrapperStyle}>
        <label style={scoresCountLabelStyle}># Of Scores</label>
        <input
          type="number"
          value={localScoresCount}
          onChange={onScoresCountChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onScoresCountApply();
          }}
          style={scoresCountInputStyle}
          min="1"
          max="10"
          onMouseDown={(e) => e.target.blur()}
        />
      </div>
      <div>
        <button
          style={{ ...buttonStyle, ...scoresCountApplyButtonStyle }}
          onClick={onScoresCountApply}
          onMouseDown={(e) => e.target.blur()}
        >
          Apply
        </button>
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
  scoresCount: PropTypes.number.isRequired,
  handleScoresCountChange: PropTypes.func.isRequired,
};

export default TimerSection;
