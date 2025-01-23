import PropTypes from "prop-types";
import {
  scoresCountdownContainer,
  playerScoreLeftStyle,
  playerScoreRightStyle,
  countdownCenterStyle,
} from "./RikerRumble.styles";

/**
 * ScoresCountdownRow:
 * Align p1Score near the left table, p2Score near the right table,
 * and timeString in the center ~ (430px) total width or so.
 */
function ScoresCountdownRow({ p1Score, p2Score, timeString }) {
  return (
    <div className="ribeye-marrow-regular" style={scoresCountdownContainer}>
      <div style={playerScoreLeftStyle}>{p1Score}</div>
      <div style={countdownCenterStyle}>{timeString}</div>
      <div style={playerScoreRightStyle}>{p2Score}</div>
    </div>
  );
}

ScoresCountdownRow.propTypes = {
  p1Score: PropTypes.number.isRequired,
  p2Score: PropTypes.number.isRequired,
  timeString: PropTypes.string.isRequired,
};

export default ScoresCountdownRow;
