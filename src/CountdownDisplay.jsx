// CountdownDisplay.jsx

import PropTypes from "prop-types";
import { countdownDisplayStyle } from "./RikerRumble.styles";

/**
 * Displays the countdown "MM:SS" below the tables,
 * centered, same size and font as the "Riker Rumble" title,
 * but closer to the tables (reducing the top margin).
 */
function CountdownDisplay({ timeString }) {
  return (
    <div style={countdownDisplayStyle}>
      <div className="ribeye-marrow-regular">{timeString}</div>
    </div>
  );
}

CountdownDisplay.propTypes = {
  timeString: PropTypes.string.isRequired,
};

export default CountdownDisplay;
