// TimerSection.jsx

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
 * - Two buttons: "Reset" and "Start/Pause".
 * - Placed between the Player columns and the "Clear All" / Title section.
 */
function TimerSection({
  minutesInput,
  setMinutesInput,
  handleReset,
  handleStartPause,
}) {
  return (
    <div style={middleContainerStyle}>
      <label style={{ ...labelStyle, marginBottom: "5px" }}>Minutes:</label>
      <input
        type="number"
        value={minutesInput}
        onChange={(e) => setMinutesInput(e.target.value)}
        style={{ ...inputStyle, width: "200px", marginBottom: "10px" }}
      />

      <div style={buttonGroupStyle}>
        <button style={buttonStyle} onClick={handleReset}>
          Reset
        </button>
        <button style={buttonStyle} onClick={handleStartPause}>
          Start/Pause
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
};

export default TimerSection;
