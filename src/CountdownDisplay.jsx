import PropTypes from "prop-types";
import {
  countdownDisplayStyle,
  countdownDisplayWrapperStyle,
} from "./RikerRumble.styles";

function CountdownDisplay({ timeString }) {
  return (
    <div style={countdownDisplayWrapperStyle}>
      <div className="ribeye-marrow-regular" style={countdownDisplayStyle}>
        {timeString}
      </div>
    </div>
  );
}

CountdownDisplay.propTypes = {
  timeString: PropTypes.string.isRequired,
};

export default CountdownDisplay;
