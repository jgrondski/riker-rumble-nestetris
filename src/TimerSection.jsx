import PropTypes from "prop-types";
import {
  middleContainerStyle,
  labelStyle,
  inputStyle,
  buttonGroupStyle,
  buttonStyle,
} from "./RikerRumble.styles";

/**
 * TimerSection:
 * - Dropdown for number of players.
 * - A label "Minutes:" above an input (default "40").
 * - Two buttons: "Reset/Apply" and "Start/Pause".
 * - "Clear All" button to the right of the minutes section.
 */
function TimerSection({
  minutesInput,
  setMinutesInput,
  handleReset,
  handleStartPause,
  isRunning,
  onClearAll,
}) {
  // Determine the label for the Start/Pause button
  const startPauseLabel = isRunning ? "Pause" : "Start";

  return (
    <div
      style={{
        ...middleContainerStyle,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Dropdown Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <label style={{ ...labelStyle, marginBottom: "5px" }}>
          # Of Players:
        </label>
        <select
          value="2"
          onChange={() => {}}
          style={{ ...inputStyle, width: "130px", marginBottom: "10px" }}
          disabled={false} // Future functionality
        >
          <option value="2">2 players</option>
          <option value="3">3 players</option>
          <option value="4">4 players</option>
        </select>
      </div>

      {/* Minutes Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label style={{ ...labelStyle, marginBottom: "5px" }}>Minutes:</label>
        <input
          type="number"
          value={minutesInput}
          onChange={(e) => setMinutesInput(e.target.value)}
          style={{ ...inputStyle, width: "140px", marginBottom: "10px" }}
          disabled={false} // Enabled at all times
        />

        <div style={buttonGroupStyle}>
          <button
            style={buttonStyle}
            onClick={handleReset}
            disabled={isRunning}
            onMouseDown={(e) => e.target.blur()}
          >
            Reset/Apply
          </button>
          <button
            style={buttonStyle}
            onClick={handleStartPause}
            onMouseDown={(e) => e.target.blur()}
          >
            {startPauseLabel}
          </button>
        </div>
      </div>

      {/* Clear All Button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <button
          style={{ ...buttonStyle, ...(onClearAll ? {} : {}) }}
          onClick={onClearAll}
          disabled={isRunning}
          onMouseDown={(e) => e.target.blur()}
        >
          Clear All
        </button>
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
  onClearAll: PropTypes.func.isRequired,
};

export default TimerSection;
