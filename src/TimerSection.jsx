import { useState } from "react";
import PropTypes from "prop-types";
import {
  middleContainerStyle,
  labelStyle,
  inputStyle,
  buttonStyle,
  clearAllButtonStyle,
} from "./RikerRumble.styles";

/**
 * TimerSection (final style):
 * - 120px tall, 625px wide (centered with margin: "30px").
 * - Single row with 3 segments:
 *   1) Reset All Scores (left)
 *   2) Middle group: [Apply (5px from Minutes), Minutes input+label, Start (5px from Minutes)]
 *   3) # Of Players (right)
 * - We keep "Reset All Scores" and "Apply" disabled when the timer is running,
 *   but the Start button is never disabled. 
 * - The labels for "Minutes" and "# Of Players" appear ~5px above the inputs.
 */

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
    <div
      style={{
        ...middleContainerStyle,
        width: "625px",
        height: "120px",
        margin: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT: Reset All Scores */}
      <div style={{ position: "relative", width: "140px", height: "35px" }}>
        <button
          style={{
            ...buttonStyle,
            ...clearAllButtonStyle,
            width: "140px",
            height: "35px",
          }}
          onClick={handleClearAll}
          disabled={isRunning} 
          onMouseDown={(e) => e.target.blur()}
        >
          Reset All Scores
        </button>
      </div>

      {/* MIDDLE: Apply, Minutes label+input, Start in a row. */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* Apply button (still disabled if isRunning) */}
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

        {/* Minutes: label above input */}
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "35px",
          }}
        >
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

        {/* Start button (NOT disabled anymore) */}
        <button
          style={{
            ...buttonStyle,
            width: "60px",
            height: "35px",
          }}
          onClick={handleStartPause}
          onMouseDown={(e) => e.target.blur()}
        >
          {startPauseLabel}
        </button>
      </div>

      {/* RIGHT: # Of Players */}
      <div style={{ position: "relative", width: "120px", height: "35px" }}>
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
          disabled={isRunning}
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
