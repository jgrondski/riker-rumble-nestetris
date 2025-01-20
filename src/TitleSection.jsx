import PropTypes from "prop-types";
import {
  middleContainerStyle,
  buttonStyle,
  clearAllButtonStyle,
  headingStyle,
} from "./RikerRumble.styles";

function TitleSection({ onClearAll }) {
  return (
    <div style={middleContainerStyle}>
      <button
        style={{ ...buttonStyle, ...clearAllButtonStyle }}
        onClick={onClearAll}
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
};

export default TitleSection;
