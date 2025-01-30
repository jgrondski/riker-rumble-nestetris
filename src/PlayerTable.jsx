import PropTypes from "prop-types";
import {
  columnStyle,
  tableStyle,
  thStyle,
  tableWrapperStyle, // new wrapper for table + scoreboard
  scoreboardStyle, // scoreboard text style
} from "./RikerRumble.styles";

function PlayerTable({ playerName, rows, score }) {
  return (
    <div style={tableWrapperStyle}>
      <div style={columnStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th className="ribeye-marrow-regular" style={thStyle}>
                {playerName}
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      {/* The scoreboard below the table */}
      <div className="ribeye-marrow-regular" style={scoreboardStyle}>
        {score}
      </div>
    </div>
  );
}

PlayerTable.propTypes = {
  playerName: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.node).isRequired,
  score: PropTypes.number.isRequired, // newly required scoreboard number
};

export default PlayerTable;
