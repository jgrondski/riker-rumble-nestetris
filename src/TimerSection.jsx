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
 * - A label "Minutes:" above an input (default "40").
 * - Two buttons: "Reset/Apply" and "Start/Pause".
 * - Placed between the Player columns and the "Clear All" / Title section.
 */
function TimerSection({
  minutesInput,
  setMinutesInput,
  handleReset,
  handleStartPause,
  isRunning,
}) {
  // Determine the label for the Start/Pause button
  const startPauseLabel = isRunning ? "Pause" : "Start";

  return (
    <div style={middleContainerStyle}>
      <label style={{ ...labelStyle, marginBottom: "5px" }}>Minutes:</label>
      <input
        type="number"
        value={minutesInput}
        onChange={(e) => setMinutesInput(e.target.value)}
        style={{ ...inputStyle, width: "200px", marginBottom: "10px" }}
        disabled={isRunning}
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
  );
}

TimerSection.propTypes = {
  minutesInput: PropTypes.string.isRequired,
  setMinutesInput: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleStartPause: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default TimerSection;
