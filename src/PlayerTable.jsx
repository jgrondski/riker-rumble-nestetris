import PropTypes from "prop-types";
import { columnStyle, tableStyle, thStyle } from "./RikerRumble.styles";

function PlayerTable({ playerName, rows }) {
  return (
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
  );
}

PlayerTable.propTypes = {
  playerName: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default PlayerTable;
