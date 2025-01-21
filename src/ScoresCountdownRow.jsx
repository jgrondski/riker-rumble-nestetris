import PropTypes from "prop-types";
import CountdownDisplay from "./CountdownDisplay";
import { containerStyle, scoreStyle } from "./RikerRumble.styles";

/**
 * Displays Player 1 score (left), the countdown timer (center),
 * and Player 2 score (right) in the same row, under the tables.
 */
function ScoresCountdownRow({ p1Score, p2Score, timeString }) {
  return (
    <div
      style={{
        ...containerStyle,
        justifyContent: "space-around",
        marginTop: "5px",
      }}
    >
      {/* Player 1 Score */}
      <div className="ribeye-marrow-regular" style={scoreStyle}>
        {p1Score}
      </div>

      {/* Countdown Timer in the center */}
      <CountdownDisplay timeString={timeString} />

      {/* Player 2 Score */}
      <div className="ribeye-marrow-regular" style={scoreStyle}>
        {p2Score}
      </div>
    </div>
  );
}

ScoresCountdownRow.propTypes = {
  p1Score: PropTypes.number.isRequired,
  p2Score: PropTypes.number.isRequired,
  timeString: PropTypes.string.isRequired,
};

export default ScoresCountdownRow;
