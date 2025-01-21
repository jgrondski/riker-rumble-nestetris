import PropTypes from "prop-types";
import {
  middleContainerStyle,
  buttonStyle,
  clearAllButtonStyle,
  headingStyle,
} from "./RikerRumble.styles";

/**
 * TitleSection:
 * - A "Clear All" button and "Riker Rumble" title.
 * - "Clear All" button is disabled when timer is running.
 */
function TitleSection({ onClearAll, isRunning }) {
  return (
    <div style={middleContainerStyle}>
      <button
        style={{ ...buttonStyle, ...clearAllButtonStyle }}
        onClick={onClearAll}
        disabled={isRunning}
        onMouseDown={(e) => e.target.blur()}
      >
        Clear All
      </button>
      <h1 className="ribeye-marrow-regular" style={headingStyle}>
        Riker Rumble
      </h1>
    </div>
  );
}

TitleSection.propTypes = {
  onClearAll: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default TitleSection;
